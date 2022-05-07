import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor( private _snackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private auntenticacionService: AutenticacionService ) { 

   this.form= this.formBuilder.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(8)]],
     deviceInfo: this.formBuilder.group({
       deviceId: ["17867868768"],
       deviceType:["DEVICE_TYPE_ANDROID"],
       notificationToken: ["67657575eececc34"]
     })
   })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  login(){
    /* console.log(this.myForm.value); */
    this.openSnackBar("Usuario no registrado", "Cerrar");
  }

  ngOnInit(): void {
  }

   get Email(){
     return this.form.get('email');
   }

   get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
      event.preventDefault;
      this.auntenticacionService.iniciarSesion(this.form.value).subscribe(data => {
        console.log('DATA: ', JSON.stringify(data));
      })
  }
}
