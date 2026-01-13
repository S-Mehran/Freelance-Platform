import { Repository } from "typeorm";
import { Proposal } from "../entity/proposal";
import { Freelancer } from "../entity/freelancer";
import { Post } from "../entity/job-post";

export class ProposalService{
    constructor(private proposalRepository: Repository<Proposal>) {}

    async findById(id: number): Promise<Proposal | null> {
        return this.proposalRepository.findOne({ 
            where: {id},
            relations: ['freelancer'],
         });
      }

    async getProposals(skip: number, limit: number): Promise<Proposal[]> {
        return this.proposalRepository.find({
            skip: skip,
            take: limit,
        })
    }

    async countProposals(): Promise<number> {

        let proposalCount = await this.proposalRepository.count()
        return proposalCount
    }

    async createProposal(proposal: Proposal): Promise<Proposal> {
        try {
        console.log('service1')
        const newProposal = this.proposalRepository.create(proposal)
        console.log('service2')
        
            await this.proposalRepository.save(newProposal);
            console.log("service3");
            return newProposal;
        } catch (error) {
            console.error("Error in save():", error);
            throw error; // rethrow to controller
        }
   }

    async deleteProposal(id: number): Promise<boolean> {
        //const post = await this.postRepository.findOneBy({id})
        //if (!post) return false
        const result = await this.proposalRepository.delete(id)
        return result.affected!==0
    }

    async updateProposal(id: number, proposal: Partial<Proposal>): Promise<Proposal|null> {
        const getProposal = await this.proposalRepository.findOneBy({id})
        if (!getProposal) return null

        const updatedProposal = this.proposalRepository.merge(getProposal, proposal)
        await this.proposalRepository.save(updatedProposal)
        return updatedProposal
    }


    async findProposalsByPostId(postId: number): Promise<Proposal[]> {
        const postProposals = await this.proposalRepository.find({
            where: {
                post: {id: postId},
            },
            relations: ["freelancer"],
        })
        return postProposals
    }

    async findProposalsByFreelancerId(freelancerId: number): Promise<Proposal[]> {
        const postProposals = await this.proposalRepository.find({
            where: {
                freelancer: {id: freelancerId},
            },
            relations: ["post"],
        })
        return postProposals
    }

    async hasFreelancerPosted(freelancerId: number, postId: number): Promise<boolean> {
        const postFreelancerProposal = await this.proposalRepository.find({
            where: {
                freelancer: {id:freelancerId},
                post: {id: postId}
            },
            relations: ["freelancer", "post"]
        }) 

        return postFreelancerProposal.length!=0
    }
}