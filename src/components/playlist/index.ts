import { Router } from "express";
import { findAll,createPlaylist } from "./controller";

const playlist: Router = Router();

playlist.get("/", findAll);
playlist.post("/",createPlaylist);

export default playlist;