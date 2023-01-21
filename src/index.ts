import express, {Express, Request, Response} from 'express';
import * as ROUTER from "./components";

const app: Express = express();


app.use(express.json())

//app.use("/api/v1/users", ROUTER.userRouter);
app.use("/api/v1/songs", ROUTER.songrouter);
app.use("/api/v1/playlist ", ROUTER.playlistRouter);

const port = 3000;
app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});