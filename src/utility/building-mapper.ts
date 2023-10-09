import { BuildingDto } from "../dto/building-dto";
import { BuildingWarmWaterDto } from "../dto/building-warm-water-dto";
import { BuildingWarmthDto } from "../dto/building-warmth-dto";
import BuildingModel, { Building } from "../model/building";
import BuildingWarmWaterModel, { BuildingWarmWater } from "../model/building-warm-water";
import BuildingWarmthModel, { BuildingWarmth } from "../model/building-warmth";

  
export const buildingFromDto = async (buildingDto: BuildingDto) => {
    try {
        if (!buildingDto) {
            throw new Error("BuildingDto is null or undefined.");
        }
        const warmth = await Promise.all(buildingDto.warmth.map(buildingWarmthFromDto))
        const warmWater = await Promise.all(buildingDto.warmWater.map(buildingWarmWaterFromDto))
        return await BuildingModel.create({
            firstName: buildingDto.firstName,
            lastName: buildingDto.lastName,
            address: buildingDto.address,
            livingSpace: buildingDto.livingSpace,
            warmth: warmth,
            warmWater: warmWater,
            heatedBasement: buildingDto.heatedBasement,
            apartments: buildingDto.apartments,
        })
    } catch (error) {
        console.error("Error transforming Building DTO: ", error)
    }
}

export const buildingToDto = (building: Building): BuildingDto => {
    const buildingDto = {
        firstName: building.firstName,
        lastName: building.lastName,
        address: building.address,
        livingSpace: building.livingSpace,
        warmth: building.warmth.map(buildingWarmthToDto),
        warmWater: building.warmWater.map(buildingWarmWaterToDto),
        heatedBasement: building.heatedBasement,
        apartments: building.apartments,
    }
    return buildingDto
}

export const buildingWarmthFromDto = async (buildingWarmthDto: BuildingWarmthDto) => {
    return await BuildingWarmthModel.create({
        value: buildingWarmthDto.value
    }).catch(error =>  console.error("Error transforming Warmth DTO: ", error))
}

export const buildingWarmthToDto = (buildingWarmth: BuildingWarmth): BuildingWarmthDto => {
    const buildingWarmthDto = {
        buildingId: buildingWarmth.buildingId._id.toString(),
        value: buildingWarmth.value
    }
    return buildingWarmthDto
}

export const buildingWarmWaterFromDto = async (buildingWarmWaterDto: BuildingWarmWaterDto) => {
    return await BuildingWarmWaterModel.create({
        value: buildingWarmWaterDto.value
    }).catch(error =>  console.error("Error transforming WarmWater DTO: ", error))
}

export const buildingWarmWaterToDto = (buildingWarmWater: BuildingWarmWater): BuildingWarmWaterDto => {
    const buildingWarmWaterDto = {
        buildingId: buildingWarmWater.buildingId._id.toString(),
        value: buildingWarmWater.value
    }
    return buildingWarmWaterDto
}