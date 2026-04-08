import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity("pending_aspirant_registrations")
export class PendingAspirantRegistration extends BaseEntity {
  @Index({ unique: true })
  @Column()
  userId!: number;

  @Column()
  phone!: string;

  @Column()
  verificationId!: string;

  @Column({ type: "text" })
  data!: string; // JSON-serialised CreateAspirantDto

  @Column({ type: "timestamptz" })
  expiresAt!: Date;
}
