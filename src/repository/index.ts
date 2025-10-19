import { AppDataSource } from "../data-source";
import { User } from "../entity/index";
import { UserService } from "../service/user.service";
import { Post } from "../entity/job-post";
import { PostService } from "../service/job-post.service";
import { ClientService } from "../service/client.service";
import { Client } from "../entity/client";
import { FreelancerService } from "../service/freelancer.service";
import { Freelancer } from "../entity/freelancer";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

export const clientRepository = new ClientService(
  AppDataSource.getRepository(Client)
)

export const freelancerRepository = new FreelancerService(
  AppDataSource.getRepository(Freelancer)
)

export const postRepository = new PostService(
  AppDataSource.getRepository(Post)
)


// const dataSource = AppDataSource.getRepository(User)

// export const userRepository = new UserService(dataSource)

