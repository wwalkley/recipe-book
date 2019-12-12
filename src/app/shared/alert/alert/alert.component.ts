import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() info: string;
  @Output() closeModal = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onCloseModal() {
    this.closeModal.emit();
  }
}
