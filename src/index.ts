import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./data-access/index";
import transactionsRouter from "./routers/transactions";
import repaymentsRouter from "./routers/repayments";
import notFound from "./controllers/not-found";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/transactions", transactionsRouter);
app.use("/repayments", repaymentsRouter);
app.use("*", (req: Request, res: Response) => res.json(notFound()));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log("listening on port:", port);

  await connect();
});

export default app;
