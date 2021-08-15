"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeDoc = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var recipeSchema = new mongoose_1.Schema({
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
var recipeModel = mongoose_1.default.model('Recipes', recipeSchema);
exports.recipeDoc = new recipeModel();
