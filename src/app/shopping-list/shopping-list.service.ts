import { Ingredient } from "./../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  getShoppingList() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addItem(addIngredient: Ingredient) {
    if (this.checkName(addIngredient)) {
      for (const ingred of this.ingredients) {
        if (this.getName(ingred) === this.getName(addIngredient)) {
          const posistion = this.ingredients.indexOf(ingred);
          this.ingredients[posistion].amount += +addIngredient.amount;
          this.ingredientsChanged.next(this.ingredients.slice());
          return;
        }
      }
      this.ingredients.push(addIngredient);
      this.ingredientsChanged.next(this.ingredients.slice());
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

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
