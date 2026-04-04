import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Aspirant } from './aspirant.entity';

export type BookingStatus = 'pending' | 'accepted' | 'rejected';

@Entity('aspirant_bookings')
export class AspirantBooking extends BaseEntity {
  @Column()
  aspirantId!: number;

  @ManyToOne(() => Aspirant, (aspirant) => aspirant.meetings)
  aspirant?: Aspirant;

  @Column()
  voterId!: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'bigint', nullable: true })
  preferredAt?: number;

  @Column({ type: 'varchar', default: 'pending' })
  status!: BookingStatus;

  @Column({ type: 'bigint', nullable: true })
  scheduledAt?: number;
}
