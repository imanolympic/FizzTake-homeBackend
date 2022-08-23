import express, { Request, Response } from "express";
import {
  getRepayments,
  postRepayment,
} from "../controllers/repayments.controller";

const router = express.Router();

router
  .route("")
  .post((_: Request, res: Response) =>
    postRepayment().then((response) => res.json(response))
  );

router
  .route("")
  .get((_: Request, res: Response) =>
    getRepayments().then((response) => res.json(response))
  );

export default router;
