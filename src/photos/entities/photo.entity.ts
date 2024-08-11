import { BaseEntity } from "../../base/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('photos')
export class Photo extends BaseEntity {
  @Column()
  url: string;
}
