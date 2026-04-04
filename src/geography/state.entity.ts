import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('states')
export class State extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  code?: string;
}
