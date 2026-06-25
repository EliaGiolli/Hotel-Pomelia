import mongoose, { Schema, model, models } from "mongoose";

export interface IRestaurantItem {
  name: string;
  description: string;
  price: number;
  category: string; // es. 'antipasti', 'primi', 'bevande'
}

const RestaurantSchema = new Schema<IRestaurantItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const Restaurant = models.Restaurant || model<IRestaurantItem>("Restaurant", RestaurantSchema);
export default Restaurant;
