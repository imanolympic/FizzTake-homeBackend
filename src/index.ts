import express, { Request, Response } from "express";
import dotenv from "dotenv";
import transactionsRouter from "./routers/transactions.router";
import repaymentsRouter from "./routers/repayments.router";
import spendinglimitsRouter from "./routers/spendinglimits.router";

import notFound from "./controllers/not-found";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/transactions", transactionsRouter);
app.use("/repayments", repaymentsRouter);
app.use("/spendinglimits", spendinglimitsRouter);
app.use("*", (_: Request, res: Response) => res.json(notFound()));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port:", port);
});

export default app;
