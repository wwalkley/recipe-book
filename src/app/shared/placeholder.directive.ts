import { Component, OnInit, ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[app-placeholder]'
})
export class PlaceholderDirective implements OnInit {
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnInit() {}
}
