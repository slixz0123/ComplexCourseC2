import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { EntornoAprendizaje } from 'src/app/Core/models/entornoAprendizaje';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import { EntornoAprendizajeService } from 'src/app/shared/Services/entornoAprendizaje.service';
import Swal from 'sweetalert2';

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
  disenoValido: boolean = true;
  eapInstalacionesValido: boolean = true;
  eapRecursosValido: boolean = true;
  eapFaseteoricaValido: boolean = true;
  eapFasePracticaValido: boolean = true;
  filtro = '';

  constructor(private entornoServ: EntornoAprendizajeService, private disenoServ: DisenoCurricularService) { }

  ngOnInit(): void {
    this.getDisenos();
    this.getEntornos();
  }

  getEntornos(): void {
    this.entornoServ.getAllTrue().subscribe((entorno) => (this.entornos = entorno));
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
    if (!this.entornoSeleccionado.eapDiseno || !this.entornoSeleccionado.eapDiseno.dcuId) {
      this.disenoValido = false;
      return;
    } else {
      this.disenoValido = true;
    }

    const instalacionesRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.eapInstalacionesValido = instalacionesRegex.test(this.entornoSeleccionado.eapInstalaciones);

    this.eapRecursosValido = instalacionesRegex.test(this.entornoSeleccionado.eapRecursos);

    this.eapFaseteoricaValido = instalacionesRegex.test(this.entornoSeleccionado.eapFaseteorica);

    this.eapFasePracticaValido = instalacionesRegex.test(this.entornoSeleccionado.eapFasepractica);

    if (this.eapInstalacionesValido && this.eapRecursosValido && this.eapFaseteoricaValido && this.eapFasePracticaValido) {
      if (this.isNew) {
        this.entornoServ.create(this.entornoSeleccionado).subscribe(() => {
          this.getEntornos();
          this.entornoSeleccionado = new EntornoAprendizaje();

          Swal.fire({
            icon: 'success',
            title: 'Entorno de aprendizaje creado',
            text: 'El entorno de aprendizaje ha sido registrado correctamente.',
            confirmButtonText: 'Aceptar'
          });
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: '¿Estás seguro?',
          text: '¿Deseas editar este registro?',
          showCancelButton: true,
          confirmButtonText: 'Editar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {

          if (!this.entornoSeleccionado.eapDiseno || !this.entornoSeleccionado.eapDiseno.dcuId) {
            this.disenoValido = false;
            return;
          }

          this.eapInstalacionesValido = instalacionesRegex.test(this.entornoSeleccionado.eapInstalaciones);

          this.eapRecursosValido = instalacionesRegex.test(this.entornoSeleccionado.eapRecursos);

          this.eapFaseteoricaValido = instalacionesRegex.test(this.entornoSeleccionado.eapFaseteorica);

          this.eapFasePracticaValido = instalacionesRegex.test(this.entornoSeleccionado.eapFasepractica);

          if (this.disenoValido && this.eapInstalacionesValido && this.eapRecursosValido && this.eapFaseteoricaValido && this.eapFasePracticaValido) {
            if (result.isConfirmed) { // Si el usuario confirma la edición
              this.entornoServ.update(this.entornoSeleccionado, this.entornoSeleccionado.eapId).subscribe(() => {
                this.getEntornos();
                this.entornoSeleccionado = new EntornoAprendizaje();
                this.isNew = true;

                Swal.fire({
                  icon: 'success',
                  title: 'Entorno de aprendizaje editado',
                  text: 'El entorno de aprendizaje ha sido modificado correctamente.',
                  confirmButtonText: 'Aceptar'
                });
              });
            }
          }else{
            Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
          }
        });
      }
    }else{
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }
  }

  eliminarEntorno(eapId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este entorno de aprendizaje?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entornoServ.delete(eapId).subscribe(() => {
          this.getEntornos();
          Swal.fire('¡Éxito!', 'El entorno de aprendizaje ha sido eliminado correctamente', 'success');
        });
      }
    });
  }

  getDisenos(): void {
    this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}

