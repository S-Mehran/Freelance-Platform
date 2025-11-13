import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import {Client} from './client'
import { levelOfExpertise } from "../enum/level-of-expertise.enum";
import { projectType } from "../enum/project-type.enum";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  title: string

  @Column({ nullable: true })
  summary: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "enum", enum: levelOfExpertise, nullable:true})
  levelOfExpertiseRequired: levelOfExpertise;

  @Column("simple-array", {nullable:true})
  skillsRequired: string[]

  @Column({type: "enum", enum:projectType})
  projectType: projectType

  @ManyToOne(()=>Client, (client:Client)=>client.posts, {eager:true})
  client: Client

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
