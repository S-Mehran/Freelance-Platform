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

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  address: string;

  @Column({nullable:true, default:0})
  jobs: number

  @Column("simple-array")
  fieldOfExpertise: string[]

  @Column({default: "available"})
  status: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}