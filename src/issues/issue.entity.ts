import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { Ward } from "../wards/ward.entity";
import { User } from "../users/user.entity";

@Entity("issues")
export class Issue extends BaseEntity {
  @Column({ nullable: true })
  electionId?: number;

  @Column({ nullable: true })
  constituencyId?: number;

  @Column({ nullable: true })
  wardId?: number;

  @ManyToOne(() => Ward, { nullable: true })
  ward?: Ward;

  @Column()
  createdById!: number;

  @ManyToOne(() => User)
  createdBy?: User;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;
}
