import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListComplimentsReceivedController } from "./controllers/ListComplimentsReceivedController";
import { ListComplimentsSentController } from "./controllers/ListComplimentsSentController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticathed";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsSentController = new ListComplimentsSentController();
const listComplimentsReceivedController =
  new ListComplimentsReceivedController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.get(
  "/users",
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle
);
router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);
router.post("/login", authenticateUserController.handle);
router.get(
  "/users/compliments/sent",
  ensureAuthenticated,
  listComplimentsSentController.handle
);
router.get(
  "/users/compliments/received",
  ensureAuthenticated,
  listComplimentsReceivedController.handle
);

export { router };
