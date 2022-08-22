import express, { Request, Response } from "express";

const router = express.Router();

router.route("").post((req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
