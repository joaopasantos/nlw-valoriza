import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";

class CreateTagService {
    async execute(name: string) {
        const tagRepository = getCustomRepository(TagRepositories);

        if (!name) {
            throw new Error("Blank Name field not allowed.");
        }

        const tagAlreadyExists = await tagRepository.findOne({ name });
        if (tagAlreadyExists) {
            throw new Error("Tag already exists.");
        }

        const tag = tagRepository.create({ name });
        tagRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };