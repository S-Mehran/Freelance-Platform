import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Freelancer } from "./freelancer";
import { Post } from "./job-post";
import { contractStatus } from "../enum/contract-status.enum";
import { Client } from "./client";
import { Proposal } from "./proposal";

@Entity({ name: "contracts" })
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(()=>Post, (post:Post)=>post.contracts)
    post: Post

    @OneToOne(()=>Freelancer, (freelancer:Freelancer)=>freelancer.contract)
    freelancer: Freelancer

    @OneToMany(()=>Client, (client: Client)=>client.contracts)
    client: Client

    @OneToOne(()=>Proposal, (proposal: Proposal)=>proposal.contract)
    proposal: Proposal

    @Column({type: "enum", enum: contractStatus, default: contractStatus.PENDING})
    status: contractStatus


    @Column({ type: "decimal", precision: 10, scale: 2, transformer: { 
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value) 
    }})
    agreedPrice: number;

    @Column({type: "date", nullable: false})
    startDate: Date

    @Column({type: "date", nullable: false})
    endDate: Date

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
