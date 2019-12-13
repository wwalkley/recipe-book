import { Component, OnInit, ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective implements OnInit {
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnInit() {}
}
