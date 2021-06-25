import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { classToPlain } from "class-transformer";

class ListUsersService {
  async execute() {
    const userRepository = getCustomRepository(UserRepositories);

    const users = await userRepository.find();

    return classToPlain(users);
  }
}

export { ListUsersService };
