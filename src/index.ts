import express, {Express, Request, Response} from "express";

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send("html");
});

app.listen(8080, () => {
    console.log("server is listening");
});