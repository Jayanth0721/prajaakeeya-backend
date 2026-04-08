import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity("parliamentary_constituencies")
export class Parliamentary extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column()
  state!: string;
}
