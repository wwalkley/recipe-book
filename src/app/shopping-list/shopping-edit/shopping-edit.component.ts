import { ShoppingListService } from "./../shopping-list.service";
import { Ingredient } from "./../../shared/ingredient.model";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addItem(newIngredient);
  }
}
