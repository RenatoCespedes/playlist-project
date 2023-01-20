import { Router } from "express";
import { findAll,createPlaylist } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/",createPlaylist);

export default userRouter;