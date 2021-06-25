import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userRepository = getCustomRepository(UserRepositories);

  const { user_id } = request;

  const { admin } = await userRepository.findOne(user_id);

  if (admin) {
    return next();
  }

  return response.status(401).end();
}
