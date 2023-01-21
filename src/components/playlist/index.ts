import { Router } from "express";
import { findAll,createPlaylist,add } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", findAll);
playlistRouter.post("/",createPlaylist);
playlistRouter.put("/",add);

export default playlistRouter;