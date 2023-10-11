import { Request, Response } from "express";
import BuildingModel, { Building } from "../model/building";
import { buildingFromDto, buildingToDto } from "../utility/building-mapper";

export const getBuildings = async (
  req: Request,
  res: Response
): Promise<void> => {
  BuildingModel.find({})
    .then((buildings) => {
      Promise.all(buildings.map((building) => buildingToDto(building))).then(
        (buildingDto) => res.json(buildingDto)
      );
    })
    .catch((err) => res.json(err));
};

export const getBuilding = (req: Request, res: Response) => {
  const id = req.params.id;
  BuildingModel.findById({ _id: id })
    .then(async (building) => {
      if (building) {
        buildingToDto(building).then((buildingDto) => res.json(buildingDto));
      }
    })
    .catch((err) => res.json(err));
};

export const updateBuilding = (req: Request, res: Response) => {
  // todo warmth and warmWater are not deleted from replaced building in db
  const id = req.params.id;
  BuildingModel.findOneAndReplace({ _id: id }, buildingFromDto(req.body))
    .then(async (building) => {
      if (building) {
        buildingToDto(building).then((buildingDto) => res.json(buildingDto));
      }
    })
    .catch((err) => res.json(err));
};

export const addBuilding = (req: Request, res: Response) => {
  buildingFromDto(req.body)
    .then((building) => {
      if (!building) {
        throw new Error("Failed to create building");
      }
      return buildingToDto(building).then((buildingDto) =>
        res.status(201).json(buildingDto)
      );
    })
    .catch((err) => res.status(500).json(err));
};

export const deleteBuilding = (req: Request, res: Response) => {
  // todo warmth and warmWater are not deleted
  const id = req.params.id;
  BuildingModel.findByIdAndDelete({ _id: id })
    .then((building) => res.sendStatus(200))
    .catch((err) => res.json(err));
};
