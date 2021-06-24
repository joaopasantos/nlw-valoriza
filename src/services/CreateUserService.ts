import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  // name, email, admin
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    if (!email) {
      throw new Error("Blank E-mail field not allowed.");
    }

    if (!password) {
      throw new Error("Blank Password field not allowed.");
    }

    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
    userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
