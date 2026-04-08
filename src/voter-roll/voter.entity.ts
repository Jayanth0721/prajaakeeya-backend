import { Column, Entity, ManyToOne, Index } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { Ward } from "../wards/ward.entity";

@Entity("voters")
export class Voter extends BaseEntity {
  @Column({ name: "sl_no", nullable: true })
  slNo?: string;

  @Column()
  name!: string;

  @Column({ name: "relative_name" })
  relativeName!: string;

  @Column({ name: "house_no", nullable: true })
  houseNo?: string;

  @Column({ type: "int", nullable: true })
  age?: number | null;

  @Column()
  gender!: string;

  @Index({ unique: true })
  @Column({ name: "epic_number" })
  epicNumber!: string;

  @Column()
  wardId!: number;

  @ManyToOne(() => Ward, (ward) => ward.voters)
  ward!: Ward;
}
