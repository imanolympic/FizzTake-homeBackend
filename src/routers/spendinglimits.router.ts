import express, { Request, Response } from "express";
import { getSpendinglimit } from "../controllers/spendinglimits.controller";

const router = express.Router();

router
  .route("")
  .get((_: Request, res: Response) =>
    getSpendinglimit().then((response) => res.json(response))
  );

export default router;
