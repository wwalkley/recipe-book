import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { DropdownDirective } from "./shared/dropdown.directive";
import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeDefaultComponent } from "./recipes/recipe-default/recipe-default.component";
import { EditComponent } from "./recipes/edit/edit.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeDefaultComponent,
    EditComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
