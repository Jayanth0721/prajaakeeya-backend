import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../common/base.entity";

export type OtpPurpose =
  | "register"
  | "login"
  | "vote"
  | "admin_login"
  | "aspirant_login"
  | "aspirant_register";

@Entity("otps")
export class Otp extends BaseEntity {
  @Index()
  @Column({ nullable: true, type: "varchar" })
  email?: string | null;

  @Index()
  @Column({ nullable: true, type: "varchar" })
  phone?: string | null;

  @Column()
  otp!: string;

  @Column({ type: "varchar", length: 20 })
  purpose!: OtpPurpose;

  @Column({ type: "varchar", nullable: true })
  verificationId?: string | null;

  @Column({ type: "timestamptz" })
  expiresAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  verifiedAt?: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  usedAt?: Date | null;
}
