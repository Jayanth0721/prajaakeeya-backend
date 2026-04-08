import {
  Injectable,
  ConflictException,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Municipality } from "./municipality.entity";
import { CreateMunicipalityDto } from "./dto/create-municipality.dto";

const KARNATAKA_CITY_CORPORATIONS = [
  "Greater Bengaluru Authority(GBA) - Bengaluru",
  "Mysuru City Corporation",
  "Mangaluru City Corporation",
  "Hubballi-Dharwad Municipal Corporation",
  "Belagavi City Corporation",
  "Kalaburagi City Corporation",
  "Davanagere City Corporation",
  "Ballari City Corporation",
  "Shivamogga City Corporation",
  "Tumakuru City Corporation",
  "Vijayapura City Corporation",
];

@Injectable()
export class MunicipalityService implements OnModuleInit {
  constructor(
    @InjectRepository(Municipality)
    private readonly repo: Repository<Municipality>,
  ) {}

  async onModuleInit() {
    for (const name of KARNATAKA_CITY_CORPORATIONS) {
      const existing = await this.repo.findOne({ where: { name } });
      if (!existing) {
        await this.repo.save(this.repo.create({ name, state: "Karnataka" }));
      }
    }
  }

  findAll(state?: string) {
    if (state) {
      return this.repo.find({ where: { state }, order: { name: "ASC" } });
    }
    return this.repo.find({ order: { name: "ASC" } });
  }

  async create(dto: CreateMunicipalityDto) {
    const existing = await this.repo.findOne({ where: { name: dto.name } });
    if (existing) throw new ConflictException("Municipality already exists");
    return this.repo.save(
      this.repo.create({ ...dto, state: dto.state ?? "Karnataka" }),
    );
  }

  async findOne(id: number) {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) throw new NotFoundException("Municipality not found");
    return m;
  }

  async update(id: number, dto: Partial<CreateMunicipalityDto>) {
    const m = await this.findOne(id);
    if (dto.name !== undefined) m.name = dto.name;
    if (dto.state !== undefined) m.state = dto.state;
    return this.repo.save(m);
  }

  async delete(id: number) {
    const m = await this.findOne(id);
    await this.repo.remove(m);
    return { message: `Municipality '${m.name}' deleted` };
  }
}
