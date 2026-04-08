import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { WardsService } from "../wards/wards.service";
import { AspirantsService } from "../aspirants/aspirants.service";
import { UsersService } from "../users/users.service";
import { CreateAspirantWardMeetingDto } from "./dto/create-aspirant-ward-meeting.dto";

@Injectable()
export class AspirantWardMeetingsService {
  constructor(
    private readonly wardsService: WardsService,
    private readonly aspirantsService: AspirantsService,
    private readonly usersService: UsersService,
  ) {}

  async createMeetingForAspirant(
    userId: number,
    dto: CreateAspirantWardMeetingDto,
  ) {
    const aspirant = await this.aspirantsService.findByUserId(userId);
    if (!aspirant)
      throw new NotFoundException("Aspirant profile not found for this user");

    // Ensure ward exists (wardsService.createMeeting will verify but sanity-check here)
    const wardId = aspirant.wardId;

    const payload = {
      wardId,
      title: dto.title,
      description: dto.description,
      meetingLink: dto.meetingLink,
      scheduledAt: dto.scheduledAt,
    };

    return this.wardsService.createMeeting(payload as any, userId);
  }

  async getMeetingsForUserWard(userId: number) {
    // Prefer ward from user profile (voters/aspirants), fallback to aspirant record
    const user = await this.usersService.findById(userId);
    let wardId: number | undefined = undefined;

    if (user && (user as any).wardId) {
      wardId = (user as any).wardId;
    } else {
      const aspirant = await this.aspirantsService.findByUserId(userId);
      if (aspirant?.wardId) wardId = aspirant.wardId;
    }

    if (!wardId) {
      throw new NotFoundException("No ward associated with this user");
    }

    return this.wardsService.getActiveMeetingsByWard(wardId);
  }

  async completeMeeting(userId: number, meetingId: number, notes: string) {
    const meeting = await this.wardsService.getMeetingById(meetingId);
    if (!meeting) throw new NotFoundException("Meeting not found");

    // allow creator or admin to complete the meeting
    const user = await this.usersService.findById(userId);
    const isCreator = meeting.createdById === userId;
    const isAdmin = user && (user as any).role === "admin";
    if (!isCreator && !isAdmin) {
      throw new ForbiddenException(
        "Not authorized to add notes to this meeting",
      );
    }

    return this.wardsService.completeMeeting(meetingId, notes);
  }

  async deleteMeeting(userId: number, meetingId: number) {
    const meeting = await this.wardsService.getMeetingById(meetingId);
    if (!meeting) throw new NotFoundException("Meeting not found");

    const user = await this.usersService.findById(userId);
    const isCreator = meeting.createdById === userId;
    const isAdmin = user && (user as any).role === "admin";
    if (!isCreator && !isAdmin) {
      throw new ForbiddenException("Not authorized to delete this meeting");
    }

    await this.wardsService.deleteMeeting(meetingId);
    return { deleted: 1 };
  }
}
