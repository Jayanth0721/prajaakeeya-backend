import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('municipalities')
export class Municipality extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ default: 'Karnataka' })
  state!: string;
}
