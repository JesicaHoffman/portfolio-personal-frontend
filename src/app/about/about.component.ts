import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  aboutMe:any = '';
  formAbout:FormGroup;
  about: any;
  
  constructor( private generalService: GeneralService,
               private formBuilder: FormBuilder,) {

                this.formAbout= this.formBuilder.group({
                  texto: ['', [Validators.required]]
                });
                
                }

  ngOnInit() {
     this.generalService.getAbout().subscribe(data =>{
       if(data[0]){
        this.about = data; 
        this.aboutMe = data[0].texto
      }else{
        this.aboutMe = '';
      }
     });

     if(localStorage.getItem('isEditable') === 'true'){
       this.isEditable = true;
     }
    }

    modificar(){
     this.editar = !this.editar
    }

   

    onEnviar(event:Event){
      event.preventDefault;
      this.about[0].nombre = this.formAbout.get('texto')?.value;
       this.generalService.modifyAbout(this.about[0]).subscribe(data =>{
         this.aboutMe = this.about[0].texto
         this.editar = true;
       }) 
  }

  

  eliminar(event:Event){
    event.preventDefault;
    this.generalService.deleteAbout(this.about[0].id).subscribe(data => {
    });
    this.generalService.getAbout().subscribe(data =>{
      if(data){
      this.aboutMe = [];
    }
    })
  }
}
