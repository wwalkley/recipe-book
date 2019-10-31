import { Ingredient } from "./../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  getShoppingList() {
    return this.ingredients.slice();
  }

  addItem(addIngredient: Ingredient) {
    if (this.checkName(addIngredient)) {
      for (const ingred of this.ingredients) {
        if (this.getName(ingred) === this.getName(addIngredient)) {
          const posistion = this.ingredients.indexOf(ingred);
          this.ingredients[posistion].amount += +addIngredient.amount;
          this.ingredientsChanged.emit(this.ingredients.slice());
          return;
        }
      }
      this.ingredients.push(addIngredient);
      this.ingredientsChanged.emit(this.ingredients.slice());
    }
  }

  getName(ingredient: Ingredient) {
    return ingredient.name;
  }

  checkName(addIngredient) {
    if (addIngredient.name.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
