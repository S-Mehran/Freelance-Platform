import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { Freelancer } from "./freelancer";
import { Post } from "./job-post";
import { bidType } from "../enum/bid-type.enum";
import { proposalStatus } from "../enum/proposal-status.enum";
import { Contract } from "./contract";
//Fields to add later => Connects Used
@Entity({ name: "proposals" })
export class Proposal {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Post, (post:Post)=>post.proposals)
    post: Post

    @ManyToOne(()=>Freelancer, (freelancer:Freelancer)=>freelancer.proposals)
    freelancer: Freelancer

    @OneToOne(() => Contract, (contract: Contract) => contract.proposal)
    contract: Contract;

    @Column({type: "text", nullable:false})
    coverLetter: string

    @Column({ type: "decimal", precision: 10, scale: 2, transformer: { 
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value) 
    }})
    bidAmount: number;

    @Column({type: "enum", enum:bidType})
    bidType: bidType

    @Column({nullable:false})
    estimatedDeliveryDays: number

    @Column({ type: "enum", enum: proposalStatus, default: proposalStatus.SUBMITTED})
    status: proposalStatus;

    @Column({ type: "varchar", length: 255, nullable:true })
    attachment: string; // Path to the file in storage (e.g., "/uploads/file-xyz.pdf")

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
