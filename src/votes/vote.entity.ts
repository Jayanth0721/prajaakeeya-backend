import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { Ward } from "../wards/ward.entity";
import { Aspirant } from "../aspirants/aspirant.entity";
import { User } from "../users/user.entity";
import { VotingWindow } from "./voting-window.entity";

@Entity("votes")
@Unique(["userId", "votingWindowId"])
export class Vote extends BaseEntity {
  @Column()
  userId!: number;

  @ManyToOne(() => User)
  user!: User;

  @Column({ nullable: true })
  wardId?: number;

  @ManyToOne(() => Ward, (ward) => ward.votes, { nullable: true })
  ward?: Ward;

  @Column()
  aspirantId!: number;

  @ManyToOne(() => Aspirant)
  aspirant!: Aspirant;

  // Track which voting window this vote belongs to (allows reset per window)
  // Nullable for backward compatibility with existing votes
  @Column({ nullable: true })
  votingWindowId?: number;

  @ManyToOne(() => VotingWindow)
  votingWindow?: VotingWindow;

  // Anti-fraud: one vote per device/network per ward per voting window
  @Column({ nullable: true, name: "ip_address" })
  ipAddress?: string;

  @Column({ nullable: true, name: "device_id" })
  deviceId?: string;
}
