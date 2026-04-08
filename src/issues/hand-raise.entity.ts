import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity("issue_hand_raises")
export class HandRaise extends BaseEntity {
  @Column({ nullable: true })
  electionId?: number;

  @Column({ nullable: true })
  constituencyId?: number;

  @Column({ nullable: true })
  wardId?: number;

  @Column()
  createdById!: number;

  @Column({ type: "text" })
  category!: string;
}
