import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteIngredient(index: number, recipeID: number) {
    this.recipes[recipeID].ingredients.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
