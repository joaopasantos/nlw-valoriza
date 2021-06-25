import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagRepository = getCustomRepository(TagRepositories);

    const tags = await tagRepository.find();

    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));

    return classToPlain(tags);
  }
}

export { ListTagsService };
