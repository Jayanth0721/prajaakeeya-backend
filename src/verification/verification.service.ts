import { Injectable } from "@nestjs/common";
import { VoterRollService } from "../voter-roll/voter-roll.service";
import { WardsService } from "../wards/wards.service";

@Injectable()
export class VerificationService {
  constructor(
    private readonly voterRollService: VoterRollService,
    private readonly wardsService: WardsService,
  ) {}

  async verifyEpic(epic: string) {
    const voter = await this.voterRollService.findEpic(epic);
    if (!voter) return { ward: null };
    const ward = await this.wardsService.findOne(voter.wardId);
    return { ward };
  }
}
