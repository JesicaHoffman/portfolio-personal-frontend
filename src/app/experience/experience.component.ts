import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiencias: any;
  isEditable: boolean = false;
  formExperiencia:FormGroup;
  addExperiencia:FormGroup;
  editar:boolean = true;
  add: boolean = false;
  closeResult = '';

  constructor( private generalService: GeneralService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.formExperiencia= this.formBuilder.group({
      empresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      proyecto: ['', [Validators.required]],
    });
    this.addExperiencia= this.formBuilder.group({
      addEmpresa: ['', [Validators.required]],
      addCargo: ['', [Validators.required]],
      addFechaInicio: ['', [Validators.required]],
      addFechaFin: ['', [Validators.required]],
      addProyecto: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.generalService.getExperiencia().subscribe(data =>{
      this.experiencias = data;
    });

    if(localStorage.getItem('isEditable') === 'true'){
      this.isEditable = true;
    }
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModal(contentt:any) {
    this.modalService.open(contentt, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  modificar(){
    this.editar = !this.editar
   }

  eliminar(event:Event, index:number){
    event.preventDefault;
    this.generalService.deleteExperiencia(this.experiencias[index].id).subscribe(data => {
      this.editar = true;
    });
    this.experiencias = this.experiencias.filter((exp:any)=>exp.id !== this.experiencias[index].id)
  }

  agregar(){
    this.add = true;
  }

  agregarExperiencia(event:Event){
    event.preventDefault;
    let exp = {
      empresa: this.addExperiencia.get('addEmpresa')?.value,
      cargo: this.addExperiencia.get('addCargo')?.value,
      fechaInicio: this.addExperiencia.get('addFechaInicio')?.value,
      fechaFin: this.addExperiencia.get('addFechaFin')?.value,
      proyecto: this.addExperiencia.get('addProyecto')?.value
    }
    this.generalService.newExperiencia(exp).subscribe(data => {
      this.add = false;
    });
    this.experiencias.push(exp);
   
  }

  onEnviar(event:Event, index:number){
    event.preventDefault;
    this.experiencias[index] = {
      id: this.experiencias[index].id,
      empresa: this.formExperiencia.get('empresa')?.value,
      cargo: this.formExperiencia.get('cargo')?.value,
      fechaInicio: this.formExperiencia.get('fechaInicio')?.value,
      fechaFin: this.formExperiencia.get('fechaFin')?.value,
      proyecto: this.formExperiencia.get('proyecto')?.value
    }
     this.generalService.modifyExperiencia(this.experiencias[index]).subscribe(data =>{
       this.editar = true;
     }) 
  }

}
