import {
  Column,
  CreateDateColumn,
  Entity,
  IntegerType,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import  User  from "./User";


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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}