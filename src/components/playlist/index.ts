import { Router } from "express";
import { findAll,createPlaylist } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", findAll);
playlistRouter.post("/",createPlaylist);

export default playlistRouter;