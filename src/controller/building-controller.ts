import { Request, Response } from "express";
import BuildingModel, { Building } from "../model/building";
import { buildingToDto } from "../utility/building-mapper";

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
