import mongoose, { Schema, model, models } from "mongoose";

export interface IExperience {
  title: string;
  description: string;
  price?: number;
  duration?: string;
  image?: string;
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  duration: { type: String },
  image: { type: String },
});

const Experience = models.Experience || model<IExperience>("Experience", ExperienceSchema);
export default Experience;
