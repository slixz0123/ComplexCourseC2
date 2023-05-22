import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { TiposCurso } from 'src/app/Core/models/tipoCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import Swal from'sweetalert2';


@Component({
  selector: 'app-register-necesidad',
  templateUrl: './register-necesidad.component.html',
  styleUrls: ['./register-necesidad.component.css'],
  template:`
  <select>
    <option *ngFor="let clase of claseauto">{{clase}}</option>
  </select>
`
})
export class RegisterNecesidadComponent {
  neceForm!: FormGroup;
  necesidad: NecesidadCurso = new NecesidadCurso();
  arraydias: Dias[] = [];
  selectedId3: Dias = new Dias();

  constructor(
    private necesidadserv: NecesidadCursoService,
    private diaserv: DiasService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.necesidad.ncuId = 0;
    this.necesidad.ncuLugardicta = '';
    this.necesidad.ncuNumparticipantes = 0;
    this.necesidad.ncuPoblaciondirigida = '';
    this.necesidad.ncuResumenyproyecto = '';
    this.necesidad.ncuEstado = true;
    localStorage.removeItem('num_placa');
    this.getdias();
    this.vertdia();

    this.neceForm = this.formbuilder.group({
      ncuIdentificador: ['', Validators.required],
      ncuLugardicta: ['', Validators.required],
      dia: ['', Validators.required],
      ncuFechaprevisfin: ['', Validators.required],
      ncuNumparticipantes: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ncuResumenyproyecto: ['', Validators.required],
      ncuPoblaciondirigida: ['', Validators.required],
    });
  }


  getdias() {
    this.diaserv.getAll().subscribe((clasedia) => (this.arraydias = clasedia.filter((clasedia) => clasedia.diaEstado !== false)));
  }

  vertdia() {
    this.diaserv.getAll().subscribe((result) => {
      console.log(result);
    });
    this.diaserv.getPorId(this.necesidad.dia.diaId).subscribe((result) => {
      console.log(result);
    });
  }
  

  onSelectChange3(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }

    const selectedValue = selectElement.value;
    console.log(selectedValue);
    this.selectedId3.diaId = Number(selectedValue);
  }

  validarFechaAntigua(): boolean {
    const fechaIngresada = new Date(this.neceForm.value.ncuFechaprevisfin);
    const fechaActual = new Date();
  
    if (fechaIngresada < fechaActual) {
      Swal.fire({
        icon: 'error',
        title: 'Fecha antigua',
        text: 'La fecha ingresada es anterior a la fecha actual. Por favor, corríjala.',
      });
      return false;
    }
  
    return true;
  }
  


  limpiarCampos() {
    this.neceForm.reset();
  }
  
  crearcurso() {
    if (this.neceForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'Por favor, complete todos los campos requeridos',
      });
      return;
    }
  
    if (!this.validarFechaAntigua()) {
      return;
    }
  
    Swal.fire({
      title: 'Desea guardar el registro de necesidad?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.necesidad.dia = this.selectedId3;
  
        this.diaserv.getById(this.necesidad.dia.diaId).subscribe((diadata) => {
          console.log(diadata);
  
          this.necesidad.dia = diadata;
          this.necesidad.ncuEstado = true;
  
          this.necesidadserv.post(this.necesidad).subscribe((dataprod) => {
            console.log(dataprod);
          });
          this.limpiarCampos();
          //window.location.reload();
        });
  
        Swal.fire('Guardado!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }
  
  
}
