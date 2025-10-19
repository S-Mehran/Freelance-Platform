import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import {userRoles} from '../enum/user-roles.enum'
import {Client} from './client'
import { Freelancer } from "./freelancer";
import { levelOfExpertise } from "../enum/level-of-expertise.enum";
import { projectType } from "../enum/project-type.enum";
import User from "./User";

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

  @Column({ type: "enum", enum: levelOfExpertise })
  levelofExpertise: levelOfExpertise;

  @Column("simple-array", {nullable:true})
  skillsRequired: string[]

  @Column({type: "enum", enum:projectType, nullable:true})
  projectType: projectType

  @ManyToOne(()=>Client, (client:Client)=>client.posts)
  client: Client

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
