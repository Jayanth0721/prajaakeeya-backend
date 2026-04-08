import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity("assembly_constituencies")
export class Assembly extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column()
  state!: string;

  @Column()
  parliamentary!: string;
}
