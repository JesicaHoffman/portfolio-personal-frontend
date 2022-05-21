import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent implements OnInit {
  formDatosPer: FormGroup;
  datosPersonales: any;
  persona: any;
  nombre: any;
  apellido: any;
  dni: any;
  fechaNacimiento: any;
  mail: any;
  telefono: any;
  nacionalidad: any;
  linkedin: any;
  editarDatos: boolean = true;
  isEditable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {
    this.formDatosPer = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.generalService.getPersona().subscribe((datos) => {
      if (datos[0]) {
        console.log('asdf');
        this.datosPersonales = datos;
        this.nombre = datos[0].nombre;
        this.apellido = datos[0].apellido;
        this.dni = datos[0].dni;
        this.fechaNacimiento = datos[0].fechaNacimiento;
        this.mail = datos[0].mail;
        this.telefono = datos[0].telefono;
        this.nacionalidad = datos[0].nacionalidad;
        this.linkedin = datos[0].linkedin;
      } else {
        this.datosPersonales = {};
      }
    });

    if (localStorage.getItem('isEditable') === 'true') {
      this.isEditable = true;
      console.log('isEditable true');
    }
  }

  modificarDatos() {
    this.editarDatos = !this.editarDatos;
  }

  onEnviarDatos(event: Event) {
    event.preventDefault;
    this.datosPersonales[0].nombre = this.formDatosPer.get('nombre')?.value;
    this.datosPersonales[0].apellido = this.formDatosPer.get('apellido')?.value;
    this.datosPersonales[0].dni = this.formDatosPer.get('dni')?.value;
    this.datosPersonales[0].fechaNacimiento =
      this.formDatosPer.get('fechaNacimiento')?.value;
    this.datosPersonales[0].mail = this.formDatosPer.get('mail')?.value;
    this.datosPersonales[0].telefono = this.formDatosPer.get('telefono')?.value;
    this.datosPersonales[0].nacionalidad =
      this.formDatosPer.get('nacionalidad')?.value;
    this.datosPersonales[0].linkedin = this.formDatosPer.get('linkedin')?.value;
    this.generalService
      .modifyPersona(this.datosPersonales[0])
      .subscribe((data) => {
        this.datosPersonales = this.datosPersonales;
        this.nombre = this.datosPersonales[0].nombre;
        this.apellido = this.datosPersonales[0].apellido;
        this.dni = this.datosPersonales[0].dni;
        this.fechaNacimiento = this.datosPersonales[0].fechaNacimiento;
        this.mail = this.datosPersonales[0].mail;
        this.telefono = this.datosPersonales[0].telefono;
        this.nacionalidad = this.datosPersonales[0].nacionalidad;
        this.linkedin = this.datosPersonales[0].linkedin;
        this.editarDatos = true;
      });
  }

  eliminar(event: Event) {
    event.preventDefault;
    this.generalService
      .deletePersona(this.datosPersonales[0].id)
      .subscribe((data) => {
        this.nombre = '';
        this.apellido = '';
        this.fechaNacimiento = '';
        this.mail = '';
        this.telefono = '';
        this.nacionalidad = '';
        this.linkedin = '';
      });
  }
}
