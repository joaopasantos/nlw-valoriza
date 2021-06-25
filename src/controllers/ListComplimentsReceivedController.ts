import { Request, Response } from "express";
import { ListComplimentsReceivedService } from "../services/ListComplimentsReceivedService";

class ListComplimentsReceivedController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listComplimentsReceivedService = new ListComplimentsReceivedService();

    const compliments = await listComplimentsReceivedService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListComplimentsReceivedController };
