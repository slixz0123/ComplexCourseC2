import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Curso } from 'src/app/Core/models/curso';
import { DisenoCurricular } from 'src/app/Core/models/disenoCurricular';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DisenoCurricularService } from 'src/app/shared/Services/disenoCurricular.service';
import Swal from 'sweetalert2';

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
  dcuIdentificadorValido: boolean = true;
  dcuNivelesValido: boolean = true;
  dcuTemasValido: boolean = true;
  filtro = '';
  id_persona:any;
  constructor(private disenoServ: DisenoCurricularService,private cursoserv: CursoService) { }

  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.getDisenos();
    this.getdisenocurricular();
  }

  cursosList: any[] = [];
  disenosList: any[] = [];
  getDisenos(): void {

    this.cursoserv.cursosporDocente(this.id_persona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data
      this.disenosList = this.cursosList.map((curso: Curso) => curso.disenoCurricular);
      
      this.disenos=this.disenosList.filter((diseno: DisenoCurricular) => diseno.dcuEstado != false);

      // Aquí tienes el array con las necesidades de cada curso
      console.log(this.disenos);
    });


    // this.disenoServ.getAllTrue().subscribe((disenos) => (this.disenos = disenos));
  }


  crearDiseno(): void {
    this.disenoServ.create(this.disenoSeleccionaddo).subscribe(() => {
      this.getDisenos();
      this.disenoSeleccionaddo = new DisenoCurricular();
      Swal.fire('¡Éxito!', 'El diseño curricular ha sido registrado correctamente', 'success');

    });
  }

  editarDiseno(diseno: DisenoCurricular): void {
    this.disenoSeleccionaddo = Object.assign({}, diseno);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  guardarDiseno(): void {
    Swal.fire({
      title: '¿Está seguro de que desea editar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disenoServ.update(this.disenoSeleccionaddo, this.disenoSeleccionaddo.dcuId).subscribe(() => {
          this.getDisenos();
          this.disenoSeleccionaddo = new DisenoCurricular();
          this.editando = false;
          this.isNew = true; // Actualización del valor de isNew
          Swal.fire('¡Éxito!', 'El diseño curricular ha sido modificado correctamente', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.disenoSeleccionaddo = new DisenoCurricular();
        this.isNew = true;
      }
    });
  }

  seleccionarArea(diseno: DisenoCurricular): void {
    this.disenoSeleccionaddo = Object.assign({}, diseno);
  }

  eliminarDiseno(areId: number): void {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disenoServ.delete(areId).subscribe(() => {
          this.getDisenos();
          this.getdisenocurricular();
          Swal.fire('¡Éxito!', 'El diseño curricular ha sido eliminado correctamente', 'success'); // SweetAlert al eliminar el área
        });
      }
    });
  }

  submitForm(): void {
    this.submitted = true;
    if (this.disenoForm && this.disenoForm.invalid) {
      return;
    }

    const identificadorRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.dcuIdentificadorValido = identificadorRegex.test(this.disenoSeleccionaddo.dcuIdentificador);

    if (!this.disenoSeleccionaddo.dcuNiveles) {
      this.dcuNivelesValido = false;
      return;
    } else {
      this.dcuNivelesValido = true;
    }

    const temasRegex = /^(?=.*[a-zA-Z])[\p{L}\p{N}.,;:!"#$%&'()*+\-\/<=>?@[\\\]^_`{|}~\s]+$/u;
    this.dcuTemasValido = temasRegex.test(this.disenoSeleccionaddo.dcuTemastransversales);

    if (this.dcuIdentificadorValido && this.dcuNivelesValido && this.dcuTemasValido) {
      if (this.isNew) {
        this.disenoSeleccionaddo.dcuId=0;
        this.crearDiseno();
      } else {
        this.guardarDiseno();
      }
      this.disenoForm?.reset();
      this.submitted = false;
      this.isNew = true;
    } else {
      Swal.fire('Error', 'Datos incorrectos. Es necesario que llene todos los datos', 'error');
    }
    this.getDisenos();
    this.getdisenocurricular();
  }

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

  // diseño curricular 
  disenonew!: DisenoCurricular;
  arraydseno: DisenoCurricular[] = [];
  newDisenoCurricular: DisenoCurricular = new DisenoCurricular;
  selectedIdDisenoCurricular: DisenoCurricular = new DisenoCurricular();

  onSelectChangediseno(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return;
    }
    const selectedValue = selectElement.value;
    this.selectedIdDisenoCurricular.dcuId = Number(selectedValue);

    // Cargar los datos en los componentes correspondientes
    const selectedDiseno = this.arraydseno.find(d => d.dcuId === this.selectedIdDisenoCurricular.dcuId);
    if (selectedDiseno) {
      this.disenoSeleccionaddo = Object.assign({}, selectedDiseno);
    } else {
      this.disenoSeleccionaddo = new DisenoCurricular();
    }
  }

  getdisenocurricular() {
    this.disenoServ.getAllTrue().subscribe(
      cursodiseno => this.arraydseno = cursodiseno.filter(cursodiseno => cursodiseno.dcuEstado !== false)
    );
  }
}
