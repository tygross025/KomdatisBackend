import express, { Request, Response, Router } from "express";
import * as buildingController from "../controller/building-controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  buildingController.getBuildings(req, res);
});

export default router;
