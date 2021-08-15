"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbIngredients = exports.dbRecipes = void 0;
var uuid_1 = require("uuid");
exports.dbRecipes = [
    {
        id: 1,
        title: "Healthy Thai Green Chicken Curry",
        description: "This healthy Thai green chicken curry couldn’t be simpler: think stir-fry, but with a fragrant coconut sauce.",
        servings: 4,
        rating: 4,
        difficulty: 3,
        preparationTime: [0, 30],
        cookingTime: [10, 30],
        tags: ["healthy", "thai", "chicken", "curry"]
    },
];
exports.dbIngredients = [
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "green chillies",
        unit: "whole",
        qty: 3.5,
        subRecipe: "Curry Paste",
        descriptions: ["long finger chillies", "chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "garlic",
        unit: "tsp",
        qty: 2,
        subRecipe: "Curry Paste",
        descriptions: ["finely grated"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "ginger",
        unit: "tsp",
        qty: 2,
        subRecipe: "Curry Paste",
        descriptions: ["finely grated"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "cumin",
        unit: "tsp",
        qty: 1,
        subRecipe: "Curry Paste",
        descriptions: ["ground"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "lemongrass stalks",
        unit: "tbsp",
        qty: 2,
        subRecipe: "Curry Paste",
        descriptions: ["very finely chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "coriander",
        unit: "g",
        qty: 40,
        subRecipe: "Curry Paste",
        descriptions: ["fresh", "leaves and stalks", "chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "kaffir lime leaves",
        unit: "whole",
        qty: 6,
        subRecipe: "Curry Paste",
        descriptions: ["thinly sliced"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "vegetable oil",
        unit: "tbsp",
        qty: 1,
        subRecipe: "Curry Paste",
        descriptions: []
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "soy sauce",
        unit: "tbsp",
        qty: 2,
        subRecipe: "Curry Paste",
        descriptions: []
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "spring onions",
        unit: "whole",
        qty: 4,
        subRecipe: "Curry Paste",
        descriptions: ["chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "lime",
        unit: "whole",
        qty: 1,
        subRecipe: "Curry Paste",
        descriptions: ["finely grated zest", "juice"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "vegetable oil",
        unit: "tsp",
        qty: 1,
        subRecipe: "Curry",
        descriptions: []
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "red onion",
        unit: "whole",
        qty: 1,
        subRecipe: "Curry",
        descriptions: ["large", "chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "red pepper",
        unit: "whole",
        qty: 1,
        subRecipe: "Curry",
        descriptions: ["deseeded", "chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "chicken thighs",
        unit: "g",
        qty: 400,
        subRecipe: "Curry",
        descriptions: ["boneless", "skinless", "cut into bite-size pieces"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "cocunut milk",
        unit: "ml",
        qty: 400,
        subRecipe: "Curry",
        descriptions: ["light"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "jasmine rice",
        unit: "g",
        qty: 85,
        subRecipe: "Curry",
        descriptions: []
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "pak choi",
        unit: "whole",
        qty: 2,
        subRecipe: "Curry",
        descriptions: ["chopped"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "shiitake mushrooms",
        unit: "g",
        qty: 250,
        subRecipe: "Curry",
        descriptions: ["trimmed"]
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "fish sauce",
        unit: "tsp",
        qty: 2,
        subRecipe: "Curry",
        descriptions: []
    },
    {
        id: uuid_1.v4(),
        recipeId: 1,
        title: "thai basil leaves",
        unit: "handful",
        qty: 1,
        subRecipe: "Curry",
        descriptions: ["small"]
    }
];
