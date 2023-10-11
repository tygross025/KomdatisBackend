import express, { Request, Response, Router } from "express";
import * as buildingController from "../controller/building-controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  buildingController.getBuildings(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  buildingController.getBuilding(req, res);
});

router.post("/add", (req: Request, res: Response) => {
  buildingController.addBuilding(req, res);
});

router.put("/update/:id", (req: Request, res: Response) => {
  buildingController.updateBuilding(req, res);
});

router.delete("/delete/:id", (req: Request, res: Response) => {
  buildingController.deleteBuilding(req, res);
});

export default router;
