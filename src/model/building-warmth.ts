import mongoose, { Document, Model, Schema } from "mongoose";

export interface BuildingWarmth extends Document {
  buildingId: mongoose.Types.ObjectId;
  value: number;
}

export const BuildingWarmthSchema: Schema = new Schema({
  buildingId: { type: mongoose.Types.ObjectId, ref: "Building" },
  value: Number,
});

const BuildingWarmthModel: Model<BuildingWarmth> = mongoose.model<BuildingWarmth>(
  "building warmth",
  BuildingWarmthSchema
);

export default BuildingWarmthModel;
