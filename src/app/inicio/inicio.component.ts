import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.play();
  }

  play() {
    const v = document.getElementsByTagName('video')[0];
    if (v.muted) {
      v.muted = false;
    } else {
      v.muted = true;
      v.play();
    }
  }
}
