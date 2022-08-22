import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("listening on port:", port);
});

app;
