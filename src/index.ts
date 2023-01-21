import app from "./app";
const port = 9001;

app.listen(port, ()=> {
console.log(`[Server]: I am running at http://localhost:${port}`);
});