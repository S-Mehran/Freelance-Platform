import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import {userRoles} from '../enum/user-roles.enum'
import {Client} from './client'
import { Freelancer } from "./freelancer";
@Entity({ name: "users" })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique:true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "enum", enum: userRoles })
  role: userRoles;

  @Column({default:"Pakistan"})
  country: string;

  @OneToOne(()=>Client, (client: Client)=>client.user, {cascade:true})
  client:Client;

  @OneToOne(()=>Freelancer, (freelancer: Freelancer)=>freelancer.user, {cascade:true})
  freelancer:Freelancer;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiresAt: Date;
}
