import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  content: boolean = true;
  constructor( private _snackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private router: Router ) { 

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


  ngOnInit(): void {
  }

   get Email(){
     return this.form.get('email');
   }

   get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){

    if(this.Email?.value === 'jesica_889@hotmail.com' && this.Password?.value === 'Jesica156'){
      localStorage.setItem('isEditable', 'true');
      this.openSnackBar("Ingresaste a modo edición", "Cerrar");
      this.content = false;
      this.router.navigateByUrl('/');
    }else{
      this.openSnackBar("Usuario no registrado", "Cerrar");
    }
     
  }
}
