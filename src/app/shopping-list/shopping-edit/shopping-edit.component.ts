import { ShoppingListService } from "./../shopping-list.service";
import { Ingredient } from "./../../shared/ingredient.model";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}

  onAddItem() {
    const name = this.nameInputRef.nativeElement.value;
    const amount: number = Math.floor(this.amountInputRef.nativeElement.value);
    const newIngredient = new Ingredient(name, amount);
    this.slService.addItem(newIngredient);
  }
}
