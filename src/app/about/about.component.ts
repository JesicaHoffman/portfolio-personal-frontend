import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../servicios/general.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isEditable:boolean = false;
  editar:boolean = true;
  constructor( private generalService : GeneralService) { }

  ngOnInit(): void {
    this.generalService.getPersona().subscribe(data => {
      console.log(data);
    });
  }

}
