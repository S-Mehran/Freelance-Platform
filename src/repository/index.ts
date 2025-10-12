import { AppDataSource } from "../data-source";
import { User } from "../entity/index";
import { UserService } from "../service/user.service";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

// const dataSource = AppDataSource.getRepository(User)

// export const userRepository = new UserService(dataSource)

