import { EntityManager, Repository } from "typeorm";
import { Post } from "../entity/job-post";
import User from "../entity/User";
import { Freelancer } from "../entity/freelancer";
export class FreelancerService {
  constructor(private freelancerRepository: Repository<Freelancer>) {}

  async findAll(): Promise<Freelancer[]> {
    return this.freelancerRepository.find();
  }

  async findById(id: number): Promise<Freelancer | null> {
    return this.freelancerRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }
  async createFreelancer(freelancer: Freelancer): Promise<Freelancer> {
    if (!freelancer.user) {
      throw new Error("User is required");
    }

    const newFreelancer = this.freelancerRepository.create(freelancer);
    await this.freelancerRepository.save(newFreelancer);
    return newFreelancer;
  }

  async updateFreelancer(
    id: number,
    freelancerData: Partial<Freelancer>
  ): Promise<Freelancer | null> {
    const freelancer = await this.freelancerRepository.findOneBy({ id });
    if (!freelancer) return null;

    this.freelancerRepository.merge(freelancer, freelancerData);
    await this.freelancerRepository.save(freelancer);
    return freelancer;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.freelancerRepository.delete({ id });
    return result.affected !== 0;
  }

  async profileUpdateAfterOrderCompletion(freelancerId: number, agreedProjectPrice: number, manager?: EntityManager): Promise<Freelancer> {
    const repo = manager ? manager.getRepository(Freelancer): this.freelancerRepository
    let freelancer = await repo.findOne({
      where: {id:freelancerId},
    })
    if (!freelancer) {
      return null
    }
    //freelancer.numberOfJobs+=1 can be used if you are using pessimitic lock condition
    //because other read/write operations are not allowed.
    //but still uising increment or updates is performance friendly because it onyl sends one row to the server
    //whereas save method sends all table rows to the server
    await repo.increment({ id: freelancerId }, 'numberOfJobs', 1);
  // await repo.increment({ id: freelancerId }, 'totalEarnings', agreedProjectPrice);
    //freelancer.numberOfJobs += 1
    //uncomment this line after creating earning column in freelancer entity
    //freelancer.totalEarnings += agreedProjectPrice

    return freelancer
  }
}