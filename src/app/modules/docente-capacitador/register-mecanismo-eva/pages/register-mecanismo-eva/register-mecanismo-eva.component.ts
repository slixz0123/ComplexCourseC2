import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MecanismoEvaluacionServService } from 'src/app/shared/Services/mecanismo-evaluacion-serv.service';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoevaluacion';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { DisenoCurricularServService } from 'src/app/shared/Services/disenoCurricular-serv.service';


@Component({
  selector: 'app-register-mecanismo-eva',
  templateUrl: './register-mecanismo-eva.component.html',
  styleUrls: ['./register-mecanismo-eva.component.css']
})
export class RegisterMecanismoEvaComponent {
  mecanismos: MecanismoEvaluacion[] = [];
  mecanismoSeleccionado: MecanismoEvaluacion = new MecanismoEvaluacion();
  disenos: DisenoCurricular[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  mecanismoForm: FormGroup | undefined;
  submitted = false;

  constructor(private mecanismoEvaluacionServ: MecanismoEvaluacionServService, private disenoServ: DisenoCurricularServService) {}

  ngOnInit(): void {
    this.getMecanismos();
    this.getDisenos();
  }

  getMecanismos(): void {
    this.mecanismoEvaluacionServ.getMecanismosTrue().subscribe((mecanismos) => (this.mecanismos = mecanismos));
  }

  crearEspeciaidad(): void {
    const data = {
      mevId: this.mecanismoSeleccionado.mevId,
      mevDescripcion: this.mecanismoSeleccionado.mevDescripcion,
      mevEstado: this.mecanismoSeleccionado.mevEstado,
      mevDiseno: this.mecanismoSeleccionado.mevDiseno
    };
  
    this.mecanismoEvaluacionServ.saveMecanismo(data).subscribe(() => {
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
    if (this.isNew) {
    this.mecanismoEvaluacionServ.saveMecanismo(this.mecanismoSeleccionado).subscribe(() => {
    this.getMecanismos();
    this.mecanismoSeleccionado = new MecanismoEvaluacion();
    });
    } else {
    this.mecanismoEvaluacionServ.updateMecanismo(this.mecanismoSeleccionado, this.mecanismoSeleccionado.mevId).subscribe(() => {
    this.getMecanismos();
    this.mecanismoSeleccionado = new MecanismoEvaluacion();
    this.isNew = true;
    });
    }
    }

    getDisenos(): void {
      this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
    }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  mostrarDatosSeleccionados() {
    const mecanismoSeleccionado = this.mecanismos.find(mecanismo => mecanismo.mevId === this.mecanismoSeleccionado.mevDiseno?.dcuId);
    console.log(mecanismoSeleccionado);
  }
}

