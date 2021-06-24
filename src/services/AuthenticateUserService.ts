import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error("Incorrect E-mail/Password.");
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new Error("Incorrect E-mail/Password.");
    }

    const token = sign(
      {
        email: user.email,
      },
      "86c123c4f7d955a2b136f90df7b938fc",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
