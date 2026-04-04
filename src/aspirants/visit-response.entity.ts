import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { AspirantVisit } from './aspirant-visit.entity';

@Entity('visit_responses')
export class VisitResponse extends BaseEntity {
  @Column()
  visitId!: number;

  @ManyToOne(() => AspirantVisit, (visit) => visit.responses)
  visit?: AspirantVisit;

  @Column()
  voterId!: number;

  @Column({ type: 'boolean' })
  attending!: boolean;
}
