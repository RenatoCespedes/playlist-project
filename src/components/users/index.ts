import { Router } from "express";
import { findAllUsers, findiduser } from "./controller";

const userrouter: Router = Router();

userrouter.get("/", findAllUsers);
userrouter.get("/:id", findiduser);



export default userrouter