import { Post } from "../entity/job-post";
import { Repository } from "typeorm";
import { postRepository } from "../repository";
import { Client } from "../entity/client";

export class PostService{
    constructor(private postRepository: Repository<Post>) {}

    async findById(id: number): Promise<Post | null> {
        return this.postRepository.findOne({ 
            where: {id},
            relations: ['client'],
         });
      }

    async getPosts(skip: number, limit: number): Promise<Post[]> {
        return this.postRepository.find({
            skip: skip,
            take: limit,
        })
    }

    async countPosts(): Promise<number> {

        let postCount = await this.postRepository.count()
        return postCount
    }

    async createPost(post: Post): Promise<Post> {
        try {
        console.log('service1')
        const newPost = this.postRepository.create(post)
        console.log('service2')
        
            await this.postRepository.save(newPost);
            console.log("service3");
            return newPost;
        } catch (error) {
            console.error("Error in save():", error);
            throw error; // rethrow to controller
        }
   }

    async deletePost(id: number): Promise<boolean> {
        //const post = await this.postRepository.findOneBy({id})
        //if (!post) return false
        const result = await this.postRepository.delete(id)
        return result.affected!==0
    }

    async updatePost(id: number, post: Partial<Post>): Promise<Post|null> {
        const getPost = await this.postRepository.findOneBy({id})
        if (!getPost) return null

        const updatedPost = this.postRepository.merge(getPost, post)
        await this.postRepository.save(updatedPost)
        return updatedPost
    }


    async findPostsByClientId(clientId: number): Promise<Post[]|null> {
        const clientPosts = await this.postRepository.find({
            where: {
                client: {id: clientId},
            },
            relations: ["client"],
        })
        
        if (!clientPosts) {
            return null
        }
        return clientPosts
    }
}