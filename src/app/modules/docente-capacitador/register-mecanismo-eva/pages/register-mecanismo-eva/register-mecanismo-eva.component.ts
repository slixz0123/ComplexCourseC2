import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MecanismoEvaluacionServService } from 'src/app/shared/Services/mecanismo-evaluacion-serv.service';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoevaluacion';


@Component({
  selector: 'app-register-mecanismo-eva',
  templateUrl: './register-mecanismo-eva.component.html',
  styleUrls: ['./register-mecanismo-eva.component.css']
})
export class RegisterMecanismoEvaComponent {
  mecanismos: MecanismoEvaluacion[] = [];
  mecanismoSeleccionado: MecanismoEvaluacion = new MecanismoEvaluacion();
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  mecanismoForm: FormGroup | undefined;
  submitted = false;

  constructor(private mecanismoEvaluacionServ: MecanismoEvaluacionServService) {}

  ngOnInit(): void {
    this.getMecanismos();
  }

  getMecanismos(): void {
    this.mecanismoEvaluacionServ.getMecanismosTrue().subscribe((mecanismos) => (this.mecanismos = mecanismos));
  }

  crearMecanismo(): void {
    this.mecanismoEvaluacionServ.saveMecanismo(this.mecanismoSeleccionado).subscribe(() => {
      this.getMecanismos();
      this.mecanismoSeleccionado = new MecanismoEvaluacion();
      console.log(this.mecanismoSeleccionado);
      
    });
  }

  editarMecanismo(mecanismo: MecanismoEvaluacion): void {
    this.mecanismoSeleccionado = Object.assign({}, mecanismo);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  guardarMecanismo(): void {
    this.mecanismoEvaluacionServ.updateMecanismo(this.mecanismoSeleccionado, this.mecanismoSeleccionado.mevId).subscribe(() => {
      this.getMecanismos();
      this.mecanismoSeleccionado = new MecanismoEvaluacion();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  seleccionarMecanismo(mecanismo: MecanismoEvaluacion): void {
    this.mecanismoSeleccionado = Object.assign({}, mecanismo);
  }

  eliminarMecanismo(mevId: number): void {
    if (confirm('¿Está seguro que desea eliminar este mecanismo de evaluación?')) {
      this.mecanismoEvaluacionServ.deleteMecanismo(mevId).subscribe(() => {
        this.getMecanismos();
      });
    }
  }

  submitForm(): void {
    this.submitted = true;
    if (this.mecanismoForm && this.mecanismoForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearMecanismo();
    } else {
      this.guardarMecanismo();
    }
    this.mecanismoForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

}

