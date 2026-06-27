import mongoose, { Schema, model, models } from "mongoose";

export interface IExperience {
  title: string;
  subtitle?: string;
  description: string;
  price?: number;
  duration?: string;
  difficulty?: string;
  image?: string;
  imageAlt?: string;
  highlight?: boolean;
  iconKey?: string;
  tags: string[];
  highlights: string[];
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, required: true },
  price: { type: Number },
  duration: { type: String, default: "" },
  difficulty: { type: String, default: "" },
  image: { type: String, default: "" },
  imageAlt: { type: String, default: "" },
  highlight: { type: Boolean, default: false },
  iconKey: { type: String, default: "" },
  tags: { type: [String], default: [] },
  highlights: { type: [String], default: [] },
});

const Experience = models.Experience || model<IExperience>("Experience", ExperienceSchema);
export default Experience;
