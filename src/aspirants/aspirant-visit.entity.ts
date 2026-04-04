import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Aspirant } from './aspirant.entity';

@Entity('aspirant_visits')
export class AspirantVisit extends BaseEntity {
  @Column()
  aspirantId!: number;

  @ManyToOne(() => Aspirant)
  aspirant?: Aspirant;

  @Column({ type: 'bigint' })
  @Column({ type: 'bigint', nullable: true })
  startTime?: number;

  @Column({ type: 'bigint', nullable: true })
  endTime?: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  googleMapsLink?: string;

  @OneToMany('VisitResponse', 'visit')
  responses?: any[];
}
