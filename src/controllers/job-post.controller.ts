import { Request, Response } from "express"
import { clientRepository, postRepository } from "../repository"

export class PostController{

    static async findPostById(req: Request, res: Response) {
        try{
            const postId = Number(req.params.id)
            const post = await postRepository.findById(postId)
            if (!post) res.status(404).json({message: "Post not found"})
        } catch(error) {
            return res.status(500).json({message: "Unable to fetch post"})
        }
    }
    static async createPost(req: Request, res: Response) {
        try{
            console.log("Post Recieved")
            const clientId = req.body.client.id
            const client = await clientRepository.findById(clientId)
            if (!client) {
                return res.status(200).json({message: "Client not found"})
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
        } else {
            return res.status(204);
        }
    }catch(error) {
        return res.status(500).json({message: "Failed to delete post"})
    }
    }

  static async updatePost(req: Request, res: Response) {
    try{
    const postId = Number(req.params.id);
    const user = await postRepository.updatePost(postId, req.body);
    return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json({message: "Error occured while creating post"})
    }
  }

}