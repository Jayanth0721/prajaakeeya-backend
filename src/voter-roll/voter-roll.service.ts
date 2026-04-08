import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Voter } from "./voter.entity";
import { CreateVoterDto } from "./dto/create-voter.dto";

@Injectable()
export class VoterRollService {
  constructor(
    @InjectRepository(Voter) private readonly repo: Repository<Voter>,
  ) {}

  async bulkInsert(voters: CreateVoterDto[]) {
    if (!voters.length) return [];
    return this.repo.upsert(voters, ["epicNumber"]);
  }

  findByWard(wardId: number) {
    return this.repo.find({ where: { wardId } });
  }

  findEpic(epicNumber: string) {
    return this.repo.findOne({ where: { epicNumber } });
  }

  async wardCounts(wardIds?: number[]) {
    const qb = this.repo
      .createQueryBuilder("voter")
      .select("voter.wardId", "wardId")
      .addSelect("COUNT(voter.id)", "total")
      .groupBy("voter.wardId");
    if (wardIds?.length) qb.where({ wardId: In(wardIds) });
    const rows = await qb.getRawMany();
    return rows.map((row) => ({
      wardId: Number(row.wardId),
      total: Number(row.total),
    }));
  }
}
