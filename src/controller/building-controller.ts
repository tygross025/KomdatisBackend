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
