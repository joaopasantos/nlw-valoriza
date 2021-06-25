import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const rawToken = request.headers.authorization;

  if (!rawToken) {
    return response.status(401).end();
  }

  const [, token] = rawToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "86c123c4f7d955a2b136f90df7b938fc"
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
