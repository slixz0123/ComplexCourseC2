import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { EntornoAprendizaje } from 'src/app/Core/models/entornoAprendizaje';
import { DisenoCurricularServService } from 'src/app/shared/Services/disenoCurricular-serv.service';
import { EntornoAprendizajeServService } from 'src/app/shared/Services/entornoAprendizaje-serv.service';

@Component({
  selector: 'app-register-entorno-aprendizaje',
  templateUrl: './register-entorno-aprendizaje.component.html',
  styleUrls: ['./register-entorno-aprendizaje.component.css']
})
export class RegisterEntornoAprendizajeComponent {

  disenos: DisenoCurricular[] = [];
  entornoSeleccionado: EntornoAprendizaje = new EntornoAprendizaje();
  entornos: EntornoAprendizaje[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  especialidadForm: FormGroup | undefined;
  submitted = false;
  selectedDiseno!: DisenoCurricular;

  constructor(private entornoServ: EntornoAprendizajeServService, private disenoServ: DisenoCurricularServService) {}

  ngOnInit(): void {
    this.getDisenos();
    this.getEntornos();
  }

  getEntornos(): void {
    this.entornoServ.getAllTrue().subscribe((entorno) => (this.entornos = entorno));
  }

  crearEspeciaidad(): void {
    const data = {
      eapInstalaciones: this.entornoSeleccionado.eapInstalaciones,
      eapRecursos: this.entornoSeleccionado.eapRecursos,
      eapFaseteorica: this.entornoSeleccionado.eapFaseteorica,
      eapFasepractica: this.entornoSeleccionado.eapFasepractica,
      diseno: this.entornoSeleccionado.eapDiseno
    };
  
    this.entornoServ.create(data).subscribe(() => {
      this.getEntornos();
      this.entornoSeleccionado = new EntornoAprendizaje();
      console.log(this.entornoSeleccionado);
    });
  }

  guardarEntorno(): void {
    this.entornoServ.update(this.entornoSeleccionado, this.entornoSeleccionado.eapId).subscribe(() => {
      this.getEntornos();
      this.entornoSeleccionado = new EntornoAprendizaje();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  editarEntorno(entorno: EntornoAprendizaje): void {
    this.entornoSeleccionado = Object.assign({}, entorno);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarEntorno(entorno: EntornoAprendizaje): void {
    this.entornoSeleccionado = Object.assign({}, entorno);
  }

  submitForm(): void {
    if (this.isNew) {
    this.entornoServ.create(this.entornoSeleccionado).subscribe(() => {
    this.getEntornos();
    this.entornoSeleccionado = new EntornoAprendizaje();
    });
    } else {
    this.entornoServ.update(this.entornoSeleccionado, this.entornoSeleccionado.eapId).subscribe(() => {
    this.getEntornos();
    this.entornoSeleccionado = new EntornoAprendizaje();
    this.isNew = true;
    });
    }
    }

    eliminarEntorno(eapId: number): void {
      if (confirm('¿Está seguro que desea eliminar este entorno de aprendizaje?')) {
        this.entornoServ.delete(eapId).subscribe(() => {
          this.getEntornos();
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
  const entornoSeleccionado = this.disenos.find(diseno => diseno.dcuId === this.entornoSeleccionado.eapDiseno.dcuId);
  console.log(entornoSeleccionado);
}

}

