import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { DisenoCurricularServService } from 'src/app/shared/Services/disenoCurricular-serv.service';

@Component({
  selector: 'app-regiser-diseno-curricular',
  templateUrl: './regiser-diseno-curricular.component.html',
  styleUrls: ['./regiser-diseno-curricular.component.css']
})
export class RegiserDisenoCurricularComponent {

  disenos: DisenoCurricular[] = [];
  disenoSeleccionaddo: DisenoCurricular = new DisenoCurricular();
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  disenoForm: FormGroup | undefined;
  submitted = false;

  constructor(private disenoServ: DisenoCurricularServService) {}

  ngOnInit(): void {
    this.getDisenos();
  }

  getDisenos(): void {
    this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }

  crearDiseno(): void {
    this.disenoServ.create(this.disenoSeleccionaddo).subscribe(() => {
      this.getDisenos();
      this.disenoSeleccionaddo = new DisenoCurricular();
      console.log(this.disenoSeleccionaddo);
      
    });
  }

  editarDiseno(diseno: DisenoCurricular): void {
    this.disenoSeleccionaddo = Object.assign({}, diseno);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  guardarDiseno(): void {
    this.disenoServ.update(this.disenoSeleccionaddo, this.disenoSeleccionaddo.dcuId).subscribe(() => {
      this.getDisenos();
      this.disenoSeleccionaddo = new DisenoCurricular();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  seleccionarArea(diseno: DisenoCurricular): void {
    this.disenoSeleccionaddo = Object.assign({}, diseno);
  }

  eliminarDiseno(areId: number): void {
    if (confirm('¿Está seguro que desea eliminar este diseño curricular?')) {
      this.disenoServ.delete(areId).subscribe(() => {
        this.getDisenos();
      });
    }
  }

  submitForm(): void {
    this.submitted = true;
    if (this.disenoForm && this.disenoForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearDiseno();
    } else {
      this.guardarDiseno();
    }
    this.disenoForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

}