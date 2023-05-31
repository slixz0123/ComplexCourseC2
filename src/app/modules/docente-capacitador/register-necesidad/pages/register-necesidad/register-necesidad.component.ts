import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { Dias } from 'src/app/Core/models/dias';
import { NecesidadCurso } from 'src/app/Core/models/necesidadCurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { NecesidadCursoService } from 'src/app/shared/Services/necesidadCurso.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-register-necesidad',
  templateUrl: './register-necesidad.component.html',
  styleUrls: ['./register-necesidad.component.css']
})
export class RegisterNecesidadComponent {
  neceForm!: FormGroup;
  necesidad: NecesidadCurso = new NecesidadCurso();
  arraydias: Dias[] = [];
  selectedId3: Dias = new Dias();
  arraynecesidades: NecesidadCurso[] = [];
  selectedIdNecesidadCurso: NecesidadCurso = new NecesidadCurso();

  constructor(
    private necesidadServ: NecesidadCursoService,
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
    this.getnecesidades();

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

  onSelectChange3(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }

    const selectedValue = selectElement.value;
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
    this.getnecesidades();
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
      if (result.isConfirmed) {
        this.necesidad.dia = this.selectedId3;
  
        this.diaserv.getById(this.necesidad.dia.diaId).subscribe((diadata) => {
          this.necesidad.ncuId = 0;
          this.necesidad.dia = diadata;
          this.necesidad.ncuEstado = true;
  
          this.necesidadServ.post(this.necesidad).subscribe((dataprod) => {
            //console.log(dataprod);
          });
          this.limpiarCampos();
          this.getnecesidades();
          //window.location.reload();
        });
  
        Swal.fire('Guardado!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
    this.getnecesidades();
  }
  
  onSelectChangenecesidades(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdNecesidadCurso.ncuId = Number(selectedValue);

    // Obtener los datos del registro seleccionado
    const selectedNecesidad = this.arraynecesidades.find((necesidad) => necesidad.ncuId === this.selectedIdNecesidadCurso.ncuId);
    if (selectedNecesidad) {
      this.neceForm.patchValue({
        ncuIdentificador: selectedNecesidad.ncuIdentificador,
        ncuLugardicta: selectedNecesidad.ncuLugardicta,
        dia: selectedNecesidad.dia.diaId,
        ncuFechaprevisfin: selectedNecesidad.ncuFechaprevisfin,
        ncuNumparticipantes: selectedNecesidad.ncuNumparticipantes,
        ncuResumenyproyecto: selectedNecesidad.ncuResumenyproyecto,
        ncuPoblaciondirigida: selectedNecesidad.ncuPoblaciondirigida
      });
      this.selectedId3.diaId = selectedNecesidad.dia.diaId;
    }
  }

  getnecesidades() {
    this.necesidadServ.getAll().subscribe(
      cursonecesidades => this.arraynecesidades = cursonecesidades
    );    
  }
}
