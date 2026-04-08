import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { AspirantMeeting } from "./aspirant-meeting.entity";

@Entity("meeting_responses")
export class MeetingResponse extends BaseEntity {
  @Column()
  meetingId!: number;

  @ManyToOne(() => AspirantMeeting, (meeting) => meeting.responses, {
    onDelete: "CASCADE",
  })
  meeting?: AspirantMeeting;

  @Column()
  voterId!: number;

  @Column({ type: "boolean" })
  attending!: boolean;
}
