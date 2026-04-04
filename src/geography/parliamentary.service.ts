import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parliamentary } from './parliamentary.entity';
import { CreateParliamentaryDto } from './dto/create-parliamentary.dto';

@Injectable()
export class ParliamentaryService {
  constructor(
    @InjectRepository(Parliamentary)
    private readonly parliamentaryRepo: Repository<Parliamentary>,
  ) {}

  async create(dto: CreateParliamentaryDto) {
    const existing = await this.parliamentaryRepo.findOne({ where: { name: dto.name } });
    if (existing) {
      throw new ConflictException('Parliamentary constituency already exists');
    }
    const parliamentary = this.parliamentaryRepo.create(dto);
    return this.parliamentaryRepo.save(parliamentary);
  }

  findAll(state?: string) {
    if (state) {
      return this.parliamentaryRepo.find({ where: { state }, order: { name: 'ASC' } });
    }
    return this.parliamentaryRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const parliamentary = await this.parliamentaryRepo.findOne({ where: { id } });
    if (!parliamentary) throw new NotFoundException('Parliamentary constituency not found');
    return parliamentary;
  }

  async update(id: number, dto: Partial<CreateParliamentaryDto>) {
    const parliamentary = await this.findOne(id);
    if (dto.name !== undefined) parliamentary.name = dto.name;
    if (dto.state !== undefined) parliamentary.state = dto.state;
    return this.parliamentaryRepo.save(parliamentary);
  }

  async delete(id: number) {
    const parliamentary = await this.findOne(id);
    await this.parliamentaryRepo.remove(parliamentary);
    return { message: `Parliamentary constituency '${parliamentary.name}' deleted` };
  }
}
