import { Request, Response } from "express"
import { clientRepository, postRepository } from "../repository"
import { catchAsync } from "../helpers/catch-async.helper"

export class PostController{

    static async findPostById(req: Request, res: Response) {
        try{
            console.log("Finding Post")
            const postId = Number(req.params.id)
            const post = await postRepository.findById(postId)
            if (!post) return res.status(404).json({message: "Post not found"})
            return res.status(200).json({post})
        } catch(error) {
            return res.status(500).json({message: "Unable to fetch post"})
        }
    }


    static async getAllPosts(req: Request, res: Response) {
        console.log("Getting Posts")
        const toTake = 10
        const postCount = await postRepository.countPosts()
        let pageCount = Math.ceil(postCount/toTake) || 1
        let page = parseInt(req.query.pg as string)
        if (page < 1) page = 1;
        if (page > Math.ceil(pageCount)) page = Math.ceil(pageCount);
        let skip = (page - 1) * toTake;
        skip = Number(skip)
        const posts = await postRepository.getPosts(skip, toTake)


        // if (posts.length===0) {
        //     return res.status(500).json({message: "Unable to fetch post"})
        // }

        return res.status(200).json({posts, totalPages: pageCount})


    }


    static async createPost(req: Request, res: Response) {
        try{
            console.log("Post Recieved")
            const clientId = req.body.client.id
            const client = await clientRepository.findById(clientId)
            if (!client) {
                return res.status(404).json({message: "Client not found"})
            }
            console.log('Entered 1')
            const upload = await postRepository.createPost({...req.body, client})
            console.log('Entered 2')
            return res.status(201).json({message: `Post has been uploaded:\n ${upload.title}`})
        }
        catch(error) {
            return res.status(500).json({message: "Failed to upload post"})
        }
    }

    static async deletePost(req: Request, res: Response) {
        try{
        const postId = Number(req.params.id);
        const isDeleted = await postRepository.deletePost(postId);
        if (!isDeleted) {
            return res.status(404).json({ message: "Post not found" });
        } 
            
        return res.status(200).json({message: "Post Deleted Successfully"});
        
    }catch(error) {
        return res.status(500).json({message: "Failed to delete post"})
    }
    }

  static async updatePost(req: Request, res: Response) {
    try{
    const postId = Number(req.params.id);
    const updatedPost = await postRepository.updatePost(postId, req.body);
    if (!updatedPost) {
        return res.status(400).json("Failed to Update Post. Try Again Later");        
    }
    return res.status(200).json(updatedPost);
    } catch(error) {
        return res.status(500).json({message: "Error occured while creating post"})
    }
  }


  static async getClientPosts(req: Request, res: Response) {
    const clientId = Number(req.params.id)
    const client = await clientRepository.findById(clientId)
    console.log(client)

    if (!client) {
        return res.status(404).json({message: "Error finding client"})
    }

    const clientPosts = await postRepository.findPostsByClientId(clientId)


    // if (clientPosts.length===0) {
    //     return res.status(404).json({message: "No Posts found"})
    // }

    return res.status(200).json({clientPosts})
  }

}