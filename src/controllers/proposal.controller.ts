import { Request, Response } from "express"
import { clientRepository, 
    freelancerRepository, 
    proposalRepository, 
    postRepository } from "../repository"
import { catchAsync } from "../helpers/catch-async.helper"

export class ProposalController{

    static async findProposalById(req: Request, res: Response) {
        try{
            const proposalId = Number(req.params.id)
            console.log(req.params)
            const proposal = await proposalRepository.findById(proposalId)
            if (!proposal) return res.status(404).json({message: "Proposal not found"})
            return res.status(200).json({proposal})
        } catch(error) {
            return res.status(500).json({error})
        }
    }


    static async getAllProposals(req: Request, res: Response) {
        console.log("Getting Proposals")
        const toTake = 10
        const proposalCount = await proposalRepository.countProposals()
        let pageCount = Math.ceil(proposalCount/toTake) || 1
        let page = parseInt(req.query.pg as string)
        if (page < 1) page = 1;
        if (page > Math.ceil(pageCount)) page = Math.ceil(pageCount);
        const skip = (page - 1) * toTake;
        
        const proposals = await proposalRepository.getProposals(skip, toTake)


        if (!proposals) {
            return res.status(500).json({message: "Unable to fetch post"})
        }
        return res.status(200).json({proposals, totalPages: pageCount})


    }


    static async createProposal(req: Request, res: Response) {
        try{
            console.log("Proposal Recieved")
            const freelancerId = req.body.freelancerId
            const freelancer = await freelancerRepository.findById(freelancerId)
            if (!freelancer) {
                return res.status(404).json({message: "Freelancer not found"})
            }

            const postId = req.body.postId

            if (!postId) {
                return res.status(404).json({message: "Post ID not found in the Request"})
            }
            const post = await postRepository.findById(postId)

            if (!post) {
                return res.status(404).json({message: "Post not found"})
            }

            let hasFreelancerPosted = await proposalRepository.hasFreelancerPosted(freelancerId, postId)
            console.log(hasFreelancerPosted)
            if (hasFreelancerPosted) {
                return res.status(400).json({message: "You have already send your proposal."})
            }

            console.log('Entered 1')
            const sendProposal = await proposalRepository.createProposal({...req.body, freelancer, post})
            console.log('Entered 2')
            return res.status(201).json({message: `Proposal has been uploaded:\n ${sendProposal.coverLetter}`})
        }
        catch(error) {
            return res.status(500).json({message: "Failed to send proposal"})
        }
    }

    static async deleteProposal(req: Request, res: Response) {
        try{
        const proposalId = Number(req.params.id);
        const isDeleted = await proposalRepository.deleteProposal(proposalId);
        if (!isDeleted) {
            return res.status(404).json({ message: "Proposal not found" });
        } 
            
        return res.status(200).json({message: "Proposal Deleted Successfully"});
        
    }catch(error) {
        return res.status(500).json({message: "Failed to delete proposal"})
    }
    }

  static async updateProposal(req: Request, res: Response) {
    try{
    const proposalId = Number(req.params.id);
    const updatedProposal = await proposalRepository.updateProposal(proposalId, req.body);
    if (!updatedProposal) {
        return res.status(400).json("Failed to Update Proposal. Try Again Later");        
    }
    return res.status(200).json(updatedProposal);
    } catch(error) {
        return res.status(500).json({message: "Error occured while creating proposal"})
    }
  }


  static async getFreelancerProposals(req: Request, res: Response) {
    const freelancerId = Number(req.params.id)
    const freelancer = await clientRepository.findById(freelancerId)
    console.log(freelancer)

    if (!freelancer) {
        return res.status(404).json({message: "Error finding client"})
    }

    const freelancerProposals = await proposalRepository.findProposalsByFreelancerId(freelancerId)


    // if (freelancerProposals.length===0) {
    //     return res.status(404).json({message: "No Proposals found"})
    // }

    return res.status(200).json({freelancerProposals})
  }


  static async getPostProposals(req: Request, res: Response) {
    const postId = Number(req.params.id)
    const post = await postRepository.findById(postId)

    if (!post) {
        return res.status(404).json({message: "Error retrieving post"})
    }

    const postProposals = await proposalRepository.findProposalsByPostId(postId)

    // if (postProposals.length===0) {
    //     return res.status(404).json({message: "No Proposals Found"})
    // }

    return res.status(200).json({postProposals})
  }
}