import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { VotesService } from "../votes/votes.service";
import { VoterRollService } from "../voter-roll/voter-roll.service";
import { WardsService } from "../wards/wards.service";
import { AspirantsService } from "../aspirants/aspirants.service";
import { ElectionsService } from "../elections/elections.service";
import { ParliamentaryService } from "../geography/parliamentary.service";
import { AssemblyService } from "../geography/assembly.service";
import { GramaPanchayatService } from "../grama-panchayat/grama-panchayat.service";
import { SESService } from "../common/services/ses.service";
import { S3Service } from "../common/services/s3.service";
import { FirebaseService } from "../common/services/firebase.service";
import { MessageCentralService } from "../common/services/message-central.service";
import { LoginDto } from "./dto/login.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { RegisterVoterDto } from "./dto/register-voter.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { GoogleRegisterDto } from "./dto/google-register.dto";
import { AppleLoginDto } from "./dto/apple-login.dto";
import { AspirantSendOtpDto } from "./dto/aspirant-send-otp.dto";
import { AspirantVerifyOtpDto } from "./dto/aspirant-verify-otp.dto";
import { Otp } from "./otp.entity";
import { User } from "../users/user.entity";
import axios from "axios";
import * as https from "https";

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  private cleanupTimer?: NodeJS.Timeout;
  private readonly otpTtlMs = 10 * 60 * 1000;
  private readonly otpCleanupIntervalMs = 60 * 1000;
  private readonly otpUsedRetentionMs = 24 * 60 * 60 * 1000;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly voterRollService: VoterRollService,
    private readonly wardsService: WardsService,
    private readonly aspirantsService: AspirantsService,
    private readonly votesService: VotesService,
    private readonly sesService: SESService,
    private readonly s3Service: S3Service,
    private readonly firebaseService: FirebaseService,
    private readonly messageCentralService: MessageCentralService,
    private readonly electionsService: ElectionsService,
    private readonly parliamentaryService: ParliamentaryService,
    private readonly assemblyService: AssemblyService,
    private readonly gramaPanchayatService: GramaPanchayatService,
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
    private readonly configService: ConfigService,
  ) {}

  // ===== Google OAuth 2.0 Authorization Code Flow =====

  getGoogleAuthUrl(state?: string): string {
    const clientId = this.configService.get<string>("GOOGLE_CLIENT_ID");
    const redirectUri = this.configService.get<string>("GOOGLE_REDIRECT_URI");
    if (!clientId || !redirectUri) {
      throw new BadRequestException("Google OAuth not configured");
    }
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
    });
    if (state) params.set("state", state);
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleGoogleCallback(code: string): Promise<{
    token: string;
    user: User;
    redirectUrl: string;
  }> {
    if (!code) {
      throw new BadRequestException("Authorization code is required");
    }

    const clientId = this.configService.get<string>("GOOGLE_CLIENT_ID");
    const clientSecret = this.configService.get<string>("GOOGLE_CLIENT_SECRET");
    const redirectUri = this.configService.get<string>("GOOGLE_REDIRECT_URI");
    const frontendRedirect = this.configService.get<string>(
      "GOOGLE_FRONTEND_REDIRECT_URI",
    );

    if (!clientId || !clientSecret || !redirectUri || !frontendRedirect) {
      throw new BadRequestException("Google OAuth not configured");
    }

    // 1. Exchange code for tokens
    let tokenResponse;
    try {
      tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 10000,
        },
      );
    } catch (error: any) {
      throw new UnauthorizedException(
        error.response?.data?.error_description ||
          "Failed to exchange authorization code",
      );
    }

    const accessToken = tokenResponse.data?.access_token;
    if (!accessToken) {
      throw new UnauthorizedException("No access token returned by Google");
    }

    // 2. Fetch user profile
    let profile: any;
    try {
      const profileResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          timeout: 10000,
        },
      );
      profile = profileResponse.data;
    } catch (error: any) {
      throw new UnauthorizedException("Failed to fetch Google user profile");
    }

    const email: string | undefined = profile?.email;
    if (!email) {
      throw new UnauthorizedException("Email not provided by Google");
    }
    if (profile.email_verified === false) {
      throw new UnauthorizedException("Google email is not verified");
    }

    // 3. Find or create user
    let user = await this.usersService.findByEmail(email);

    if (user && user.isBlocked && user.name !== "Deleted User") {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    if (user && (user.isSelfDeleted || (user.isBlocked && user.name === "Deleted User"))) {
      const reactivated = await this.usersService.reactivateAccount(email, {
        name: profile.name,
        role: "voter",
      } as any);
      if (reactivated) user = reactivated;
    } else if (!user) {
      user = await this.usersService.create({
        email,
        name: profile.name || email.split("@")[0],
        role: "voter",
      } as any);
    }

    // 4. Generate JWT
    const jwt = await this.jwtService.signAsync({ sub: user!.id });

    // 5. Build redirect URL back to the app with token
    const sep = frontendRedirect.includes("?") ? "&" : "?";
    const redirectUrl = `${frontendRedirect}${sep}token=${encodeURIComponent(jwt)}`;

    return { token: jwt, user: user!, redirectUrl };
  }

  onModuleInit() {
    this.cleanupTimer = setInterval(() => {
      this.cleanupOtps().catch(() => undefined);
    }, this.otpCleanupIntervalMs);
  }

  onModuleDestroy() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }

  async login(loginDto: LoginDto) {
    if (!loginDto.epicId) {
      throw new BadRequestException("epicId is required");
    }
    const existing = await this.usersService.findByEpic(loginDto.epicId);
    if (!existing || existing.isSelfDeleted) {
      throw new NotFoundException("User not registered");
    }

    // Reject blocked users — EPIC ID is blocked
    if (existing.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    // Prevent admin users from using the regular voter login endpoint
    if (existing.role === "admin") {
      throw new UnauthorizedException("Admin must use admin login endpoint");
    }

    // Aspirants must login using mobile OTP, not EPIC ID
    if (existing.role === "aspirant") {
      throw new ForbiddenException(
        "Aspirants must use mobile OTP login. Please use the aspirant login endpoint.",
      );
    }

    // Generate JWT directly — no OTP needed
    const payload = { sub: existing.id };
    let userWithWard: any = existing;
    if (existing.wardId) {
      try {
        const ward = await this.wardsService.findOne(existing.wardId);
        userWithWard = {
          ...existing,
          wardNumber: ward.number,
          state: ward.state,
          parliamentary: ward.parliamentary,
          assembly: ward.assembly,
        };
      } catch (e) {
        // ignore if ward not found
      }
    }
    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithWard,
    };
  }

  async adminLogin(loginDto: LoginDto) {
    if (!loginDto.email) {
      throw new UnauthorizedException("Email required for admin login");
    }
    const existing = await this.usersService.findByEmail(loginDto.email);
    if (!existing || existing.role !== "admin") {
      throw new UnauthorizedException("Admin not registered");
    }

    // Expect password for admin login
    if (!loginDto.password) {
      throw new UnauthorizedException("Password required for admin login");
    }

    // Verify password using stored salt/hash
    if (!existing.passwordSalt || !existing.passwordHash) {
      throw new UnauthorizedException("Admin has no password set");
    }
    const crypto = await import("crypto");
    const hash = crypto
      .scryptSync(loginDto.password, existing.passwordSalt, 64)
      .toString("hex");
    if (hash !== existing.passwordHash) {
      throw new UnauthorizedException("Invalid admin credentials");
    }

    const payload = { sub: existing.id };
    return { token: await this.jwtService.signAsync(payload), user: existing };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    // Get the latest login OTP record for this email
    const otpRecord = await this.otpRepo.findOne({
      where: { email: verifyOtpDto.email, purpose: "login" },
      order: { createdAt: "DESC" },
    });

    if (
      !otpRecord ||
      !otpRecord.verificationId ||
      otpRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid or expired OTP");
    }

    // Validate verificationId if provided in request
    if (
      verifyOtpDto.verificationId &&
      verifyOtpDto.verificationId !== otpRecord.verificationId
    ) {
      throw new UnauthorizedException("Invalid verification session");
    }

    // Verify OTP with SES
    const { verified } = await this.sesService.verifyOtp(
      verifyOtpDto.email,
      otpRecord.verificationId,
      verifyOtpDto.otp,
    );

    if (!verified) {
      throw new UnauthorizedException("Invalid OTP");
    }

    // Mark OTP as verified and used
    otpRecord.verifiedAt = new Date();
    otpRecord.usedAt = new Date();
    await this.otpRepo.save(otpRecord);

    // Get user
    const user = await this.usersService.findByEmail(verifyOtpDto.email);
    if (!user || user.isSelfDeleted) {
      throw new UnauthorizedException("User not found");
    }
    const payload = { sub: user.id };
    // attach ward details (number, state, parliamentary, assembly) when available
    let userWithWard: any = user;
    if (user.wardId) {
      try {
        const ward = await this.wardsService.findOne(user.wardId);
        userWithWard = {
          ...user,
          wardNumber: ward.number,
          state: ward.state,
          parliamentary: ward.parliamentary,
          assembly: ward.assembly,
        };
        // If user is an aspirant, attach aspirantId when possible
        if (user.role === "aspirant") {
          try {
            const aspirant = await this.aspirantsService.findByUserId(user.id);
            if (aspirant) userWithWard.aspirantId = aspirant.id;
          } catch (e) {
            // ignore lookup errors
          }
        }
      } catch (e) {
        // ignore if ward not found
      }
    }
    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithWard,
    };
  }

  async adminVerifyOtp(verifyOtpDto: VerifyOtpDto) {
    // Get the latest login OTP record for this email
    const otpRecord = await this.otpRepo.findOne({
      where: { email: verifyOtpDto.email, purpose: "admin_login" },
      order: { createdAt: "DESC" },
    });

    if (
      !otpRecord ||
      !otpRecord.verificationId ||
      otpRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid or expired OTP");
    }

    // Validate verificationId if provided in request
    if (
      verifyOtpDto.verificationId &&
      verifyOtpDto.verificationId !== otpRecord.verificationId
    ) {
      throw new UnauthorizedException("Invalid verification session");
    }

    // Verify OTP with SES
    const { verified } = await this.sesService.verifyOtp(
      verifyOtpDto.email,
      otpRecord.verificationId,
      verifyOtpDto.otp,
    );

    if (!verified) {
      throw new UnauthorizedException("Invalid OTP");
    }

    // Mark OTP as verified and used
    otpRecord.verifiedAt = new Date();
    otpRecord.usedAt = new Date();
    await this.otpRepo.save(otpRecord);

    // Get user and verify admin role
    const user = await this.usersService.findByEmail(verifyOtpDto.email);
    if (!user || user.role !== "admin") {
      throw new UnauthorizedException("Invalid admin credentials");
    }
    const payload = { sub: user.id };
    return { token: await this.jwtService.signAsync(payload), user };
  }

  async seedAdmin(email: string, name?: string, password?: string) {
    if (process.env.NODE_ENV === "production") {
      throw new ForbiddenException("Not allowed");
    }
    return this.usersService.upsertAdmin(email, name, password);
  }

  async requestRegisterOtp(dto: LoginDto) {
    if (!dto.email) {
      throw new BadRequestException("Email is required");
    }
    // Do not allow requesting registration OTP if user already exists
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException("User already registered");
    }

    // Send OTP via AWS SES
    const { verificationId, message } = await this.sesService.sendOtp(
      dto.email,
    );

    const record = this.otpRepo.create({
      email: dto.email,
      otp: "SES_OTP", // Placeholder since actual OTP is sent via email
      purpose: "register",
      verificationId,
      expiresAt: new Date(Date.now() + this.otpTtlMs),
    });
    await this.otpRepo.save(record);
    return { message, verificationId };
  }

  async verifyRegisterOtp(dto: VerifyOtpDto) {
    const record = await this.otpRepo.findOne({
      where: { email: dto.email, purpose: "register" },
      order: { createdAt: "DESC" },
    });
    if (
      !record ||
      record.usedAt ||
      record.verifiedAt ||
      !record.verificationId ||
      record.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid or expired OTP");
    }

    // Validate verificationId if provided in request
    if (dto.verificationId && dto.verificationId !== record.verificationId) {
      throw new UnauthorizedException("Invalid verification session");
    }

    // Verify OTP with SES
    const { verified } = await this.sesService.verifyOtp(
      dto.email,
      record.verificationId,
      dto.otp,
    );

    if (!verified) {
      throw new UnauthorizedException("Invalid OTP");
    }

    record.verifiedAt = new Date();
    await this.otpRepo.save(record);
    return { message: "OTP verified" };
  }

  async aspirantSendLoginOtp(dto: AspirantSendOtpDto) {
    const user = await this.usersService.findByPhone(dto.mobileNumber);
    if (!user || user.isSelfDeleted) {
      throw new NotFoundException(
        "No aspirant account found with this mobile number",
      );
    }
    if (user.role !== "aspirant") {
      throw new ForbiddenException(
        "This mobile number is not registered as an aspirant",
      );
    }
    if (user.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    const { verificationId, message } =
      await this.messageCentralService.sendOtp(dto.mobileNumber);

    const record = this.otpRepo.create({
      phone: dto.mobileNumber,
      otp: "MC_OTP",
      purpose: "aspirant_login",
      verificationId,
      expiresAt: new Date(Date.now() + this.otpTtlMs),
    });
    await this.otpRepo.save(record);
    return { message, verificationId };
  }

  async aspirantResendLoginOtp(dto: AspirantSendOtpDto) {
    const user = await this.usersService.findByPhone(dto.mobileNumber);
    if (!user || user.isSelfDeleted) {
      throw new NotFoundException(
        "No aspirant account found with this mobile number",
      );
    }
    if (user.role !== "aspirant") {
      throw new ForbiddenException(
        "This mobile number is not registered as an aspirant",
      );
    }
    if (user.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    const { verificationId, message } =
      await this.messageCentralService.sendOtp(dto.mobileNumber);

    const record = this.otpRepo.create({
      phone: dto.mobileNumber,
      otp: "MC_OTP",
      purpose: "aspirant_login",
      verificationId,
      expiresAt: new Date(Date.now() + this.otpTtlMs),
    });
    await this.otpRepo.save(record);
    return { message, verificationId };
  }

  async aspirantVerifyLoginOtp(dto: AspirantVerifyOtpDto) {
    const otpRecord = await this.otpRepo.findOne({
      where: { phone: dto.mobileNumber, purpose: "aspirant_login" },
      order: { createdAt: "DESC" },
    });

    if (
      !otpRecord ||
      !otpRecord.verificationId ||
      otpRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid or expired OTP");
    }

    if (otpRecord.verificationId !== dto.verificationId) {
      throw new UnauthorizedException("Invalid verification session");
    }

    const { verified } = await this.messageCentralService.verifyOtp(
      dto.mobileNumber,
      dto.verificationId,
      dto.code,
    );

    if (!verified) {
      throw new UnauthorizedException("Invalid OTP");
    }

    otpRecord.verifiedAt = new Date();
    otpRecord.usedAt = new Date();
    await this.otpRepo.save(otpRecord);

    const user = await this.usersService.findByPhone(dto.mobileNumber);
    if (!user || user.role !== "aspirant" || user.isSelfDeleted) {
      throw new UnauthorizedException("Aspirant not found");
    }
    if (user.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    const payload = { sub: user.id };
    let userWithWard: any = user;
    if (user.wardId) {
      try {
        const ward = await this.wardsService.findOne(user.wardId);
        userWithWard = {
          ...user,
          wardNumber: ward.number,
          state: ward.state,
          parliamentary: ward.parliamentary,
          assembly: ward.assembly,
        };
        try {
          const aspirant = await this.aspirantsService.findByUserId(user.id);
          if (aspirant) userWithWard.aspirantId = aspirant.id;
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
    }
    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithWard,
    };
  }

  async profile(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user || user.isSelfDeleted) return null;

    const result: any = { ...user };
    if (user.role === "aspirant") {
      try {
        const aspirant = await this.aspirantsService.findByUserId(user.id);
        if (aspirant) {
          result.aspirantId = aspirant.id;
          result.electionId = aspirant.electionId ?? null;
          result.constituencyId = aspirant.constituencyId ?? null;
          // Resolve election and constituency names
          if (aspirant.electionId) {
            try {
              const election = await this.electionsService.findById(
                aspirant.electionId,
              );
              result.electionName = election.name;
              result.electionType = election.type;
              if (aspirant.constituencyId) {
                try {
                  if (election.type === "lok_sabha") {
                    const pc = await this.parliamentaryService.findOne(
                      aspirant.constituencyId,
                    );
                    result.constituencyName = pc.name;
                  } else if (election.type === "state_assembly") {
                    const ac = await this.assemblyService.findOne(
                      aspirant.constituencyId,
                    );
                    result.constituencyName = ac.name;
                  } else if (election.type === "municipal_corporation") {
                    const ward = await this.wardsService.findOne(
                      aspirant.constituencyId,
                    );
                    result.constituencyName = `${ward.number} - ${ward.name}`;
                  } else if (election.type === "gram_panchayat") {
                    const village = await this.gramaPanchayatService.findBySrNo(
                      aspirant.constituencyId,
                    );
                    result.constituencyName = village.villageName;
                    result.gpName = village.gpName;
                    result.taluk = village.taluk;
                    result.district = village.district;
                  }
                } catch (e) {
                  // ignore constituency lookup errors
                }
              }
            } catch (e) {
              // ignore election lookup errors
            }
          }
          // Attach document verification status from aspirant profile
          try {
            result.documentStatus = aspirant.getDocumentStatus();
          } catch (e) {
            // ignore if method unavailable
          }
          result.allowPhone = aspirant.allowPhone;
          result.allowWhatsapp = aspirant.allowWhatsapp;
          result.allowChat = aspirant.allowChat;
          // If aspirant has a wardId, attach that ward's number as the aspirant ward
          if (aspirant.wardId) {
            try {
              const aspirantWard = await this.wardsService.findOne(
                aspirant.wardId,
              );
              if (aspirantWard) {
                // Attach aspirantWardNumber to make it explicit
                result.aspirantWardNumber = aspirantWard.number;
                // Also prefer aspirant wardNumber if user.wardId is not set
                if (!result.wardNumber) result.wardNumber = aspirantWard.number;
              }
            } catch (e) {
              // ignore aspirant ward lookup errors
            }
          }
        }
      } catch (e) {
        // ignore lookup errors
      }
    }
    // Attach ward metadata (including ward number) when available
    if (user.wardId) {
      try {
        const ward = await this.wardsService.findOne(user.wardId);
        if (ward) {
          result.wardNumber = ward.number;
          result.state = ward.state ?? result.state;
          result.parliamentary = ward.parliamentary ?? result.parliamentary;
          result.assembly = ward.assembly ?? result.assembly;
          // Include ward category (telegram link removed)
          result.category = ward.category ?? result.category ?? null;
        }
      } catch (e) {
        // ignore if ward lookup fails
      }
    }
    // Interaction flags are already part of user entity, no need to fetch separately
    // They will be included in the result automatically
    // Add voting status flag
    try {
      result.hasVoted = await this.votesService.hasUserVotedInActiveWindow(
        user.id,
      );
    } catch (e) {
      // ignore vote lookup errors and default to false
      result.hasVoted = false;
    }
    return result;
  }

  async registerVoter(dto: RegisterVoterDto) {
    // Verify Firebase token to get authenticated email
    const decodedToken = await this.firebaseService.verifyIdToken(dto.idToken);
    const email = decodedToken.email;
    if (!email) {
      throw new BadRequestException("Email not provided by Google Sign-In");
    }

    // Only allow Gmail accounts
    const domain = email.split("@")[1]?.toLowerCase();
    if (domain !== "gmail.com") {
      throw new BadRequestException(
        "Only Gmail accounts are allowed for registration",
      );
    }

    // Check email uniqueness
    const existingByEmail = await this.usersService.findByEmail(email);
    if (existingByEmail) {
      const canReRegister =
        existingByEmail.isSelfDeleted ||
        (existingByEmail.isBlocked && existingByEmail.name === "Deleted User");
      if (canReRegister) {
        // Reactivate the old account with same ID
        const reactivated = await this.usersService.reactivateAccount(email, {
          name: dto.name,
          role: "voter",
        } as any);
        if (!reactivated) {
          throw new BadRequestException(
            "Failed to reactivate account. Please try again.",
          );
        }
        const payload = { sub: reactivated.id };
        return {
          token: await this.jwtService.signAsync(payload),
          user: reactivated,
        };
      }
      if (existingByEmail.isBlocked) {
        throw new ForbiddenException(
          "Your account has been blocked by an admin. Please contact support.",
        );
      }
      throw new ConflictException("Email is already registered");
    }

    // Create voter user (no ward assignment — voters have access to all wards)
    const user = await this.usersService.create({
      name: dto.name,
      email,
      role: "voter",
    } as any);

    const payload = { sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async googleLogin(googleLoginDto: GoogleLoginDto) {
    // Verify Firebase token
    const decodedToken = await this.firebaseService.verifyIdToken(
      googleLoginDto.idToken,
    );

    const email = decodedToken.email;
    if (!email) {
      throw new UnauthorizedException("Email not provided by Google");
    }

    // Check if user exists
    const user = await this.usersService.findByEmail(email);
    if (!user || user.isSelfDeleted) {
      throw new NotFoundException(
        "User not registered. Please register first.",
      );
    }

    if (user.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    // Prevent admin users from using the regular voter login endpoint
    if (String(user.role) === "admin") {
      throw new UnauthorizedException("Admin must use admin login endpoint");
    }

    const payload = { sub: user.id };

    // Attach ward details when available
    let userWithWard: any = user;
    if (user.wardId) {
      try {
        const ward = await this.wardsService.findOne(user.wardId);
        userWithWard = {
          ...user,
          wardNumber: ward.number,
          state: ward.state,
          parliamentary: ward.parliamentary,
          assembly: ward.assembly,
        };
        // If user is an aspirant, attach aspirantId when possible
        if (String(user.role) === "aspirant") {
          try {
            const aspirant = await this.aspirantsService.findByUserId(user.id);
            if (aspirant) userWithWard.aspirantId = aspirant.id;
          } catch (e) {
            // ignore lookup errors
          }
        }
      } catch (e) {
        // ignore if ward not found
      }
    }

    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithWard,
    };
  }

  async appleLogin(appleLoginDto: AppleLoginDto) {
    // Verify Firebase token (Apple Sign-In token via Firebase)
    const decodedToken = await this.firebaseService.verifyIdToken(
      appleLoginDto.idToken,
    );

    const email = decodedToken.email;
    if (!email) {
      throw new UnauthorizedException("Email not provided by Apple");
    }

    // Check if user exists
    const user = await this.usersService.findByEmail(email);
    if (!user || user.isSelfDeleted) {
      throw new NotFoundException(
        "User not registered. Please register first.",
      );
    }

    if (user.isBlocked) {
      throw new ForbiddenException(
        "Your account has been blocked. Please contact support.",
      );
    }

    // Prevent admin users from using the regular voter login endpoint
    if (String(user.role) === "admin") {
      throw new UnauthorizedException("Admin must use admin login endpoint");
    }

    const payload = { sub: user.id };

    // Attach ward details when available
    let userWithWard: any = user;
    if (user.wardId) {
      try {
        const ward = await this.wardsService.findOne(user.wardId);
        userWithWard = {
          ...user,
          wardNumber: ward.number,
          state: ward.state,
          parliamentary: ward.parliamentary,
          assembly: ward.assembly,
        };
        if (String(user.role) === "aspirant") {
          try {
            const aspirant = await this.aspirantsService.findByUserId(user.id);
            if (aspirant) userWithWard.aspirantId = aspirant.id;
          } catch (e) {
            // ignore lookup errors
          }
        }
      } catch (e) {
        // ignore if ward not found
      }
    }

    return {
      token: await this.jwtService.signAsync(payload),
      user: userWithWard,
    };
  }

  async googleAdminLogin(googleLoginDto: GoogleLoginDto) {
    // Verify Firebase token
    const decodedToken = await this.firebaseService.verifyIdToken(
      googleLoginDto.idToken,
    );

    const email = decodedToken.email;
    if (!email) {
      throw new UnauthorizedException("Email not provided by Google");
    }

    // Check if user exists and is admin
    const user = await this.usersService.findByEmail(email);
    if (!user || user.role !== "admin") {
      throw new UnauthorizedException("Admin not registered");
    }

    const payload = { sub: user.id };
    return { token: await this.jwtService.signAsync(payload), user };
  }

  async googleRegister(
    googleRegisterDto: GoogleRegisterDto,
    profilePicture?: Express.Multer.File,
  ) {
    // Verify Firebase token
    const decodedToken = await this.firebaseService.verifyIdToken(
      googleRegisterDto.idToken,
    );

    const email = decodedToken.email;
    if (!email) {
      throw new UnauthorizedException("Email not provided by Google");
    }

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      const canReRegister =
        existingUser.isSelfDeleted ||
        (existingUser.isBlocked && existingUser.name === "Deleted User");
      if (!canReRegister) {
        if (existingUser.isBlocked) {
          throw new ForbiddenException(
            "Your account has been blocked by an admin. Please contact support.",
          );
        }
        throw new BadRequestException(
          "User already registered. Please login instead.",
        );
      }
    }

    // Call external electoral API
    let voterData: any;
    try {
      const response = await axios.post(
        "https://electoralapi.bbmpgov.in/searchby-epic",
        { epic_no: googleRegisterDto.epicNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      );
      voterData = response.data;
      console.log("Electoral API Response:", voterData);
    } catch (error: any) {
      console.error("Electoral API Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        epic: googleRegisterDto.epicNumber,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch voter details from electoral API";

      throw new BadRequestException({
        message: errorMessage,
        details: error.response?.data,
        status: error.response?.status,
      });
    }

    // Normalize electoral API response
    const extractFirst = (d: any): any => {
      if (d == null) return d;
      if (Array.isArray(d)) return d[0];
      if (d.data) return extractFirst(d.data);
      return d;
    };

    const voter = extractFirst(voterData);

    // If confirm=false or not provided, just return the voter data for review
    if (!googleRegisterDto.confirm) {
      return {
        message:
          "Voter details fetched. Please confirm to proceed with registration.",
        voterDetails: voter,
      };
    }

    // If confirm=true, proceed with registration
    const wardNameFromApi = voter?.ward_name || voter?.ward_name_l1;
    if (!wardNameFromApi) {
      throw new BadRequestException("Ward name not provided by electoral API");
    }

    let ward;
    try {
      ward = await this.wardsService.findByName(wardNameFromApi);
    } catch (error) {
      throw new NotFoundException(
        `Ward not found with name: ${wardNameFromApi}. Please ensure ward data is imported.`,
      );
    }

    // Create user with electoral API data and Google info
    const userData: any = {
      email,
      role: "voter",
      wardId: ward.id,
      voterEpic: voter?.voter_epic,
      nameEn: voter?.name_en,
      nameKn: voter?.name_kn,
      corporationName: voter?.corporation_name,
      corporationNameL1: voter?.corporation_name_l1,
      wardName: voter?.ward_name,
      wardNameL1: voter?.ward_name_l1,
      psName: voter?.ps_name,
      psNameL1: voter?.ps_name_l1,
      psLong: voter?.ps_long ? parseFloat(String(voter.ps_long)) : undefined,
      psLat: voter?.ps_lat ? parseFloat(String(voter.ps_lat)) : undefined,
      // Keep legacy fields for backward compatibility
      name: voter?.name_en || decodedToken.name,
      epicId: voter?.voter_epic,
    };

    // Block duplicate EPIC registrations (skip if it's the same blocked user)
    const existingByEpic = await this.usersService.findByEpic(
      voter?.voter_epic || googleRegisterDto.epicNumber,
    );
    const canReRegister =
      existingUser &&
      (existingUser.isSelfDeleted ||
        (existingUser.isBlocked && existingUser.name === "Deleted User"));
    if (
      existingByEpic &&
      !(canReRegister && existingByEpic.id === existingUser!.id)
    ) {
      throw new ConflictException(
        "This EPIC ID is already registered. Please log in instead.",
      );
    }

    // Reactivate blocked account or create new user
    let user: User;
    if (canReRegister) {
      const reactivated = await this.usersService.reactivateAccount(
        email,
        userData,
      );
      user = reactivated!;
    } else {
      user = await this.usersService.create(userData);
    }

    // Override with uploaded profile picture if provided
    if (profilePicture) {
      const profilePictureUrl = await this.s3Service.uploadFile(
        profilePicture,
        `profiles/${user.id}`,
      );
      user.profilePicture = profilePictureUrl;
      await this.usersService.updateUser(user.id, {
        profilePicture: profilePictureUrl,
      } as any);
    }

    // Generate JWT token
    const payload = { sub: user.id };
    const response: any = {
      token: await this.jwtService.signAsync(payload),
      user,
      ward: {
        id: ward.id,
        number: ward.number,
        state: ward.state,
        parliamentary: ward.parliamentary,
        assembly: ward.assembly,
      },
    };
    return response;
  }

  private async cleanupOtps() {
    const now = Date.now();
    const expiredAt = new Date(now);
    const usedBefore = new Date(now - this.otpUsedRetentionMs);

    await this.otpRepo.delete({ expiresAt: LessThan(expiredAt) });
    await this.otpRepo.delete({ usedAt: LessThan(usedBefore) });
  }
}
