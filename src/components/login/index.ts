import {generatetoken} from "./controller";
import { Router } from "express";

const loginrouter: Router = Router();

loginrouter.post("/", generatetoken);

export default loginrouter