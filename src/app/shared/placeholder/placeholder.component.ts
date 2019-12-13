import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnInit() {}
}
