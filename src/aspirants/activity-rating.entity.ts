import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Index(["type", "activityId", "voterId"], { unique: true })
@Entity("activity_ratings")
export class ActivityRating extends BaseEntity {
  @Column({ type: "varchar" })
  type!: "meeting" | "visit";

  @Column()
  activityId!: number;

  @Column()
  aspirantId!: number;

  @Column()
  voterId!: number;

  @Column({ type: "int" })
  rating!: number; // 1-5
}
