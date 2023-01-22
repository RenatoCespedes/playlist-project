import express, {type Application } from "express";
import { userrouter, playlistRouter,songrouter, loginrouter } from "./components";
import { hash } from "bcrypt";
const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userrouter);
app.use("/api/v1/songs", songrouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/login", loginrouter);


export default app;
