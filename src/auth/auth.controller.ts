import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AdminSeedDto } from './dto/admin-seed.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RegisterVoterDto } from './dto/register-voter.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { GoogleRegisterDto } from './dto/google-register.dto';
import { AppleLoginDto } from './dto/apple-login.dto';
import { AspirantSendOtpDto } from './dto/aspirant-send-otp.dto';
import { AspirantVerifyOtpDto } from './dto/aspirant-verify-otp.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Voter/aspirant login with EPIC ID (returns JWT)' })
  @ApiResponse({ 
    status: 201, 
    description: 'Login successful, JWT returned',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login with password (returns JWT)' })
  @ApiResponse({ 
    status: 201, 
    description: 'Login successful, JWT returned',
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  adminLogin(@Body() dto: LoginDto) {
    return this.authService.adminLogin(dto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and get JWT token for voter' })
  @ApiResponse({ status: 201, description: 'OTP verified, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid OTP' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post('admin/verify-otp')
  @ApiOperation({ summary: 'Verify OTP and get JWT token for admin' })
  @ApiResponse({ status: 201, description: 'OTP verified, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid OTP' })
  adminVerifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.adminVerifyOtp(dto);
  }

  // @Post('admin/seed')
  // @ApiOperation({ summary: 'Seed initial admin user (create admin with password)' })
  // @ApiResponse({ status: 201, description: 'Admin created successfully' })
  // seedAdmin(@Body() dto: AdminSeedDto) {
  //   return this.authService.seedAdmin(dto.email!, dto.name, dto.password);
  // }

  @Post('register-voter')
  @ApiOperation({
    summary: 'Register a new voter',
    description: 'Register a new voter with name and email.'
  })
  @ApiResponse({ status: 201, description: 'Voter registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  registerVoter(@Body() dto: RegisterVoterDto) {
    return this.authService.registerVoter(dto);
  }

  @Post('google/login')
  @ApiOperation({ 
    summary: 'Login with Google Firebase token',
    description: 'Authenticate user using Google Sign-In via Firebase. Requires Firebase ID token obtained from client-side Google authentication.'
  })
  @ApiResponse({ status: 201, description: 'Login successful, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid Firebase token or unauthorized' })
  @ApiResponse({ status: 404, description: 'User not registered' })
  googleLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.googleLogin(dto);
  }

  @Post('google/admin/login')
  @ApiOperation({ 
    summary: 'Admin login with Google Firebase token',
    description: 'Authenticate admin user using Google Sign-In via Firebase. Requires Firebase ID token obtained from client-side Google authentication.'
  })
  @ApiResponse({ status: 201, description: 'Admin login successful, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid Firebase token or not an admin' })
  googleAdminLogin(@Body() dto: GoogleLoginDto) {
    return this.authService.googleAdminLogin(dto);
  }

  @Post('apple/login')
  @ApiOperation({
    summary: 'Login with Apple Firebase token',
    description: 'Authenticate user using Apple Sign-In via Firebase. Requires Firebase ID token obtained from client-side Apple authentication.'
  })
  @ApiResponse({ status: 201, description: 'Login successful, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid Firebase token or unauthorized' })
  @ApiResponse({ status: 404, description: 'User not registered' })
  appleLogin(@Body() dto: AppleLoginDto) {
    return this.authService.appleLogin(dto);
  }

  @Post('google/register')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiOperation({ 
    summary: 'Register new voter with Google authentication',
    description: 'Register a new voter using Google Sign-In via Firebase. Step 1: Call with idToken and epicNumber to fetch voter details. Step 2: Call with idToken, epicNumber, confirm=true and optional profilePicture to complete registration.'
  })
  @ApiResponse({ status: 201, description: 'Voter details fetched or registration completed' })
  @ApiResponse({ status: 400, description: 'Validation error or user already registered' })
  @ApiResponse({ status: 401, description: 'Invalid Firebase token' })
  googleRegister(
    @Body() dto: GoogleRegisterDto,
    @UploadedFile() profilePicture?: Express.Multer.File
  ) {
    return this.authService.googleRegister(dto, profilePicture);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  me(@CurrentUser() user: any) {
    return this.authService.profile(user.id);
  }

  @Post('aspirant/send-otp')
  @ApiOperation({ summary: 'Send OTP to aspirant mobile number for login' })
  @ApiResponse({ status: 201, description: 'OTP sent, verificationId returned' })
  @ApiResponse({ status: 404, description: 'Aspirant not found' })
  aspirantSendLoginOtp(@Body() dto: AspirantSendOtpDto) {
    return this.authService.aspirantSendLoginOtp(dto);
  }

  @Post('aspirant/resend-otp')
  @ApiOperation({ summary: 'Resend OTP to aspirant mobile number for login' })
  @ApiResponse({ status: 200, description: 'OTP resent, verificationId returned' })
  @ApiResponse({ status: 404, description: 'Aspirant not found' })
  aspirantResendLoginOtp(@Body() dto: AspirantSendOtpDto) {
    return this.authService.aspirantResendLoginOtp(dto);
  }

  @Post('aspirant/verify-otp')
  @ApiOperation({ summary: 'Verify aspirant OTP and get JWT token' })
  @ApiResponse({ status: 201, description: 'OTP verified, JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid OTP' })
  aspirantVerifyLoginOtp(@Body() dto: AspirantVerifyOtpDto) {
    return this.authService.aspirantVerifyLoginOtp(dto);
  }
}
