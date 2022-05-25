import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isEditable: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('isEditable') === 'true') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }

  logOut() {
    localStorage.removeItem('isEditable');
    window.location.reload();
    this.isEditable = false;
  }
}
