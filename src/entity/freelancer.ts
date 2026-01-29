import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import  User  from "./User";
import { Proposal } from "./proposal";
import { Contract } from "./contract";


@Entity({ name: "freelancers" })
export class Freelancer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.freelancer)
  @JoinColumn()
  user: User;

  @Column({nullable:true, default:0})
  numberOfJobs: number

  @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
  fieldOfExpertise: string[];

  @Column({default: "available"})
  status: string

  @Column({type: "decimal", precision: 10, scale: 2, default: 4.99})
  hourlyRate: number

  @OneToMany(() => Proposal, (proposal: Proposal) => proposal.post)
  proposals: Proposal[];

  @OneToMany(() => Contract, (contract: Contract) => contract.freelancer)
  contracts: Contract[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}