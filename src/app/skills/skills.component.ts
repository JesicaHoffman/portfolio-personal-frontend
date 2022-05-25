import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  isEditable: boolean = false;
  skills: any;
  formSkill: FormGroup;
  addSkill: FormGroup;
  editar: boolean = true;
  add: boolean = false;
  closeResult = '';

  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formSkill = this.formBuilder.group({
      tecnologia: ['', [Validators.required]],
      porcentaje: ['', [Validators.required]],
    });
    this.addSkill = this.formBuilder.group({
      addTecnologia: ['', [Validators.required]],
      addPorcentaje: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.generalService.getSkills().subscribe((data) => {
      this.skills = data;
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
    this.generalService.deleteSkill(this.skills[index].id).subscribe((data) => {
      this.editar = true;
    });
    this.skills = this.skills.filter(
      (skill: any) => skill.id !== this.skills[index].id
    );
  }

  agregar() {
    this.add = true;
  }

  agregarSkill(event: Event) {
    event.preventDefault;
    let skill = {
      tecnologia: this.addSkill.get('addTecnologia')?.value,
      porcentaje: this.addSkill.get('addPorcentaje')?.value,
    };
    this.generalService.newSkill(skill).subscribe((data) => {
      this.add = false;
    });
    this.skills.push(skill);
  }

  onEnviar(event: Event, index: number) {
    event.preventDefault;
    this.skills[index] = {
      id: this.skills[index].id,
      tecnologia: this.formSkill.get('tecnologia')?.value,
      porcentaje: this.formSkill.get('porcentaje')?.value,
    };
    this.generalService.modifySkills(this.skills[index]).subscribe((data) => {
      this.editar = true;
    });
  }
}
