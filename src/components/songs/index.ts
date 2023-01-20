import { Router } from "express";
import { findAll, findbyid, creacion } from "./controller";

const songrouter: Router = Router();

songrouter.get("/", findAll);
songrouter.get("/:id", findbyid);
songrouter.post("/", creacion);


export default songrouter
