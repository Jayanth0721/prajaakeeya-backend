import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

export type ElectionType = 'lok_sabha' | 'state_assembly' | 'municipal_corporation' | 'gram_panchayat';

@Entity('elections')
export class Election extends BaseEntity {
  @Column({ unique: true })
  type!: ElectionType;

  @Column()
  name!: string;

  @Column({ nullable: true })
  scope?: string;
}
