import mongoose, { Schema, Model } from 'mongoose';

interface RecipeInterface {
  title: string
  description: string
  servings: number
  rating: number
  numRatings: number
  difficulty: number
  time: number,
  preparationTime: number[]
  cookingTime: number[]
  tags: string[]
  userId: string
  ingredientsId: string
}

const recipeSchema = new Schema<RecipeInterface, Model<RecipeInterface>>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  servings: { type: Number, required: true },
  rating: { type: Number, required: true },
  numRatings: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  time: { type: Number, required: true },
  preparationTime: { type: [Number], required: true },
  cookingTime: { type: [Number], required: true },
  tags: { type: [String], required: true },
  userId: { type: String, required: true },
  ingredientsId: { type: String, required: true }
});

const recipeModel = mongoose.model('Recipes', recipeSchema);

export const recipeDoc = new recipeModel()