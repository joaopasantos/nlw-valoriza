import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { TagRepositories } from "../repositories/TagRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepositories);
    const userRepository = getCustomRepository(UserRepositories);
    const tagRepository = getCustomRepository(TagRepositories);

    const userReceiverExists = await userRepository.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exist.");
    }

    if (user_sender === user_receiver) {
      throw new Error("Cannot register compliments to yourself.");
    }

    const tagExists = await tagRepository.findOne(tag_id);
    if (!tagExists) {
      throw new Error("Invalid Tag.");
    }

    const compliment = complimentRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
