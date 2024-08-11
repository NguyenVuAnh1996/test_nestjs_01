import { BaseEntity } from "../../base/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('clips')
export class Clip extends BaseEntity {
  @Column()
  url: string;
}
