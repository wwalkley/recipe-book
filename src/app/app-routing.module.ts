import { RecipeDefaultComponent } from "./recipes/recipe-default/recipe-default.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { EditComponent } from "./recipes/edit/edit.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipeDefaultComponent },
      { path: "new", component: EditComponent },
      { path: ":id", component: RecipeDetailComponent },
      { path: ":id/edit", component: EditComponent }
    ]
  },
  { path: "shopping-list", component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
