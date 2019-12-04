import { AuthService } from './../authentication/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private rService: RecipeService,
    private authService: AuthService
  ) {}
  url = 'https://recipe-book-8cb30.firebaseio.com/recipes/.json';
  storeRecipes() {
    const recipes = this.rService.getRecipes();
    this.http.put(this.url, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.rService.setRecipes(recipes);
      })
    );
  }
}
