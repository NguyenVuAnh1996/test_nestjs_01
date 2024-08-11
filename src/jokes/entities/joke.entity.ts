import { BaseEntity } from "../../base/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('jokes')
export class Joke extends BaseEntity {
  @Column()
  content: string
}
