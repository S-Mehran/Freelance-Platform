import { Post } from "../entity/job-post";
import { Repository } from "typeorm";
import { proposalRepository } from "../repository";
import { Client } from "../entity/client";
import { Proposal } from "../entity/proposal";

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

    async createPost(proposal: Proposal): Promise<Proposal> {
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

    async deletePost(id: number): Promise<boolean> {
        //const post = await this.postRepository.findOneBy({id})
        //if (!post) return false
        const result = await this.proposalRepository.delete(id)
        return result.affected!==0
    }

    async updatePost(id: number, post: Partial<Post>): Promise<Proposal|null> {
        const getProposal = await this.proposalRepository.findOneBy({id})
        if (!getProposal) return null

        const updatedProposal = this.proposalRepository.merge(getProposal, post)
        await this.proposalRepository.save(updatedProposal)
        return updatedProposal
    }


    // async findProposalsByPostId(clientId: number): Promise<Proposal[]|null> {
    //     const clientPosts = await this.proposalRepository.find({
    //         where: {
    //             client: {id: clientId},
    //         },
    //         relations: ["client"],
    //     })
        
    //     if (!clientPosts) {
    //         return null
    //     }
    //     return clientPosts
    // }
}