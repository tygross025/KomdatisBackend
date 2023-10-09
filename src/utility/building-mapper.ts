import { Types } from "mongoose";
import { BuildingDto } from "../dto/building-dto";
import { BuildingWarmWaterDto } from "../dto/building-warm-water-dto";
import { BuildingWarmthDto } from "../dto/building-warmth-dto";
import BuildingModel, { Building } from "../model/building";
import BuildingWarmWaterModel, {
  BuildingWarmWater,
} from "../model/building-warm-water";
import BuildingWarmthModel, { BuildingWarmth } from "../model/building-warmth";

export const buildingFromDto = async (buildingDto: BuildingDto) => {
  if (!buildingDto) {
    throw new Error("Building DTO is null or undefined");
  }
  const warmth = await Promise.all(
    buildingDto.warmth.map(buildingWarmthFromDto)
  );
  const warmWater = await Promise.all(
    buildingDto.warmWater.map(buildingWarmWaterFromDto)
  );
  return BuildingModel.create({
    firstName: buildingDto.firstName,
    lastName: buildingDto.lastName,
    address: buildingDto.address,
    livingSpace: buildingDto.livingSpace,
    warmth: warmth,
    warmWater: warmWater,
    heatedBasement: buildingDto.heatedBasement,
    apartments: buildingDto.apartments,
  });
};

export const buildingToDto = async (
  building: Building
): Promise<BuildingDto | undefined> => {
  try {
    const warmthArr = await Promise.all(
      building.warmth.map((warmth) =>
        BuildingWarmthModel.findById(warmth._id).then((o) =>
          buildingWarmthToDto(o!)
        )
      )
    );
    const warmWaterArr = await Promise.all(
      building.warmWater.map((warmWater) =>
        BuildingWarmWaterModel.findById(warmWater._id).then((o) =>
          buildingWarmWaterToDto(o!)
        )
      )
    );
    const buildingDto = {
      firstName: building.firstName,
      lastName: building.lastName,
      address: building.address,
      livingSpace: building.livingSpace,
      warmth: warmthArr,
      warmWater: warmWaterArr,
      heatedBasement: building.heatedBasement,
      apartments: building.apartments,
    };
    return buildingDto;
  } catch (error) {
    console.error(error);
  }
};

export const buildingWarmthFromDto = async (
  buildingWarmthDto: BuildingWarmthDto
) => {
  try {
    return await BuildingWarmthModel.create({
      value: buildingWarmthDto.value,
    });
  } catch (error) {
    console.error("Error transforming Warmth DTO: ", error);
  }
};

export const buildingWarmthToDto = (
  buildingWarmth: BuildingWarmth
): BuildingWarmthDto => {
  const buildingWarmthDto = {
    value: buildingWarmth.value,
  };
  return buildingWarmthDto;
};

export const buildingWarmWaterFromDto = async (
  buildingWarmWaterDto: BuildingWarmWaterDto
) => {
  try {
    return await BuildingWarmWaterModel.create({
      value: buildingWarmWaterDto.value,
    });
  } catch (error) {
    console.error("Error transforming WarmWater DTO: ", error);
  }
};

export const buildingWarmWaterToDto = (
  buildingWarmWater: BuildingWarmWater
): BuildingWarmWaterDto => {
  const buildingWarmWaterDto = {
    value: buildingWarmWater.value,
  };
  return buildingWarmWaterDto;
};
