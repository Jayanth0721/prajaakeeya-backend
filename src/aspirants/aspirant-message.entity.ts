import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from '../users/user.entity';
import { Aspirant } from './aspirant.entity';

@Entity('aspirant_messages')
export class AspirantMessage extends BaseEntity {
  @Column({ type: 'text' })
  content!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'aspirant_id' })
  aspirantId!: number;

  @ManyToOne(() => Aspirant)
  @JoinColumn({ name: 'aspirant_id' })
  aspirant!: Aspirant;
}
