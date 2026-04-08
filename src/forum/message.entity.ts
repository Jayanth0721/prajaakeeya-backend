import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { User } from "../users/user.entity";
import { Ward } from "../wards/ward.entity";

@Entity("messages")
export class Message extends BaseEntity {
  @Column({ type: "text" })
  content!: string;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "ward_id" })
  wardId!: number;

  @ManyToOne(() => Ward)
  @JoinColumn({ name: "ward_id" })
  ward!: Ward;
}
