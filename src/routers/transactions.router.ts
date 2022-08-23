import express, { Request, Response } from "express";
import {
  postTransaction,
  getTransactions,
  patchTransaction,
} from "../controllers/transactions.controller";

const router = express.Router();

router.route("").post((req: Request, res: Response) => {
  postTransaction(req).then((response) => res.json(response));
});

router.route("").get((_: Request, res: Response) => {
  getTransactions().then((response) => res.json(response));
});

router
  .route("")
  .patch((req: Request, res: Response) =>
    patchTransaction(req).then((response) => res.json(response))
  );

export default router;
