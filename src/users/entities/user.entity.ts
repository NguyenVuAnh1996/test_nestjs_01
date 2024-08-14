import { BaseEntity } from "../../base/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  notitokens: string[];
}
