import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
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

    @Column({name: "post_id"})
    postId: number
    
    @ManyToOne(()=>Post, (post:Post)=>post.contracts, {
      onDelete: "CASCADE"
    })
    @JoinColumn({name: "post_id"})
    post: Post

    @Column({name: "freelancer_id"})
    freelancerId: number

    @ManyToOne(()=>Freelancer, (freelancer:Freelancer)=>freelancer.contracts, {
      onDelete: "RESTRICT"
    })
    @JoinColumn({name: "freelancer_id"})
    freelancer: Freelancer

    @Column({name: "client_id"})
    clientId: number

    @ManyToOne(()=>Client, (client: Client)=>client.contracts, {
      onDelete: "RESTRICT"
    })
    @JoinColumn({name: "client_id"})
    client: Client

    @Column({name: "proposal_id"})
    proposalId: number
    
    @OneToOne(()=>Proposal, (proposal: Proposal)=>proposal.contract, {
      onDelete: "SET NULL"
    })
    @JoinColumn({name: "proposal_id"})
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

    @DeleteDateColumn()
    deletedAt?: Date;
}
