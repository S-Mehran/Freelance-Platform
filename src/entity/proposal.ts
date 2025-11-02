import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Freelancer } from "./freelancer";

@Entity({ name: "proposals" })
export class Proposal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    about_yourself: string

}