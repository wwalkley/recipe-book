import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    // tslint:disable-next-line: max-line-length
    new Recipe(
      "Eggs Benedict",
      "American brunch dish",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eggs_benedict.jpg/800px-Eggs_benedict.jpg",
      [
        new Ingredient("Eggs", 2),
        new Ingredient("English Muffin", 1),
        new Ingredient("Hollandasie sauce", 1),
        new Ingredient("Tofu", 2)
      ]
    ),
    // tslint:disable-next-line: max-line-length
    new Recipe(
      "Guacamole & Chips",
      "Mexican based chip & dip",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Guacamole_IMGP1303.jpg/800px-Guacamole_IMGP1303.jpg",
      [
        new Ingredient("Corn chips", 30),
        new Ingredient("Avocado", 2),
        new Ingredient("Salt & Pepper", 1),
        new Ingredient("Lemon", 1),
        new Ingredient("Red Onion", 1),
        new Ingredient("Garlic", 1)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  sendToShoppingList(ingredients: Ingredient[]) {
    for (const ingredient of ingredients) {
      this.slService.addItem(ingredient);
    }
  }
}
