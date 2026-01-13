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
import User  from "./User";
import {Post} from "./job-post";
import { Contract } from "./contract";

@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @Column({ type: "numeric", precision: 10, scale: 2, default: 0.00 })
  amountSpent: number

  @Column({default: 0})
  numberOfHires: number

  @OneToMany(() => Post, (post: Post) => post.client)
  posts: Post[];

  @OneToMany(() => Contract, (contract: Contract) => contract.client)
  contracts: Contract[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}