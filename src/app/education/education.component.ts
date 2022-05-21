import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educaciones: any;
  isEditable: boolean = false;
  formEducacion: FormGroup;
  addEducacion: FormGroup;
  editar: boolean = true;
  add: boolean = false;
  closeResult = '';
  loading:boolean = true;
  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formEducacion = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });
    this.addEducacion = this.formBuilder.group({
      addTitulo: ['', [Validators.required]],
      addInstitucion: ['', [Validators.required]],
      addFechaInicio: ['', [Validators.required]],
      addFechaFin: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.generalService.getEducacion().subscribe((data) => {
      console.log(data);
      this.educaciones = data;
      this.loading = false;
    });

    if (localStorage.getItem('isEditable') === 'true') {
      this.isEditable = true;
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openModal(contentt: any) {
    this.modalService
      .open(contentt, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  modificar() {
    this.editar = !this.editar;
  }

  eliminar(event: Event, index: number) {
    event.preventDefault;
    this.generalService
      .deleteEducacion(this.educaciones[index].id)
      .subscribe((data) => {
        this.editar = true;
      });
    this.educaciones = this.educaciones.filter(
      (educ: any) => educ.id !== this.educaciones[index].id
    );
  }

  agregar() {
    this.add = true;
  }

  agregarEducacion(event: Event) {
    event.preventDefault;
    let educ = {
      titulo: this.addEducacion.get('addTitulo')?.value,
      institucion: this.addEducacion.get('addInstitucion')?.value,
      fechaInicio: this.addEducacion.get('addFechaInicio')?.value,
      fechaFin: this.addEducacion.get('addFechaFin')?.value,
    };
    this.generalService.newEducacion(educ).subscribe((data) => {
      this.add = false;
    });
    this.educaciones.push(educ);
  }

  onEnviar(event: Event, index: number) {
    event.preventDefault;
    this.educaciones[index] = {
      id: this.educaciones[index].id,
      titulo: this.formEducacion.get('titulo')?.value,
      institucion: this.formEducacion.get('institucion')?.value,
      fechaInicio: this.formEducacion.get('fechaInicio')?.value,
      fechaFin: this.formEducacion.get('fechaFin')?.value,
    };
    console.log(this.educaciones[index]);
    this.generalService
      .modifyEducacion(this.educaciones[index])
      .subscribe((data) => {
        this.editar = true;
      });
  }
}
