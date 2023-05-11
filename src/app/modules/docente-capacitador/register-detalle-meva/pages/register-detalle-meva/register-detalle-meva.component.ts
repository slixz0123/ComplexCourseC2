import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'bootstrap';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoevaluacion';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { MecanismoEvaluacionServService } from 'src/app/shared/Services/mecanismo-evaluacion-serv.service';
import { DetalleMevaServService } from 'src/app/shared/Services/detalle-meva-serv.service';


@Component({
  selector: 'app-register-detalle-meva',
  templateUrl: './register-detalle-meva.component.html',
  styleUrls: ['./register-detalle-meva.component.css']
})
export class RegisterDetalleMevaComponent {
   
  mecanismos: MecanismoEvaluacion[] = [];
  detalleSeleccionado: DetalleMe = new DetalleMe();
  detalles: DetalleMe[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  detalleForm: FormGroup | undefined;
  submitted = false;
  selectedMecanismo!: MecanismoEvaluacion;

  constructor(private detalleServ: DetalleMevaServService, private mecanismoServ: MecanismoEvaluacionServService) {}

  ngOnInit(): void {
    this.getMecanismos();
    this.getDetalles();
  }

  getDetalles(): void {
    this.detalleServ.getAllTrue().subscribe((detalles) => (this.detalles = detalles));
  }

  crearEspeciaidad(): void {
    const data = {
      dmeInstrumento: this.detalleSeleccionado.dmeInstrumento,
      dmeTecnica: this.detalleSeleccionado.dmeTecnica,
      mecanismo: this.detalleSeleccionado.mecanismoEvaluacion
    };
  
    this.detalleServ.create(data).subscribe(() => {
      this.getDetalles();
      this.detalleSeleccionado = new DetalleMe();
      console.log(this.detalleSeleccionado);
    });
  }

  guardarDetalle(): void {
    this.detalleServ.update(this.detalleSeleccionado, this.detalleSeleccionado.dmeId).subscribe(() => {
      this.getDetalles();
      this.detalleSeleccionado = new DetalleMe();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  editarDetalle(detalle: DetalleMe): void {
    this.detalleSeleccionado = Object.assign({}, detalle);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarDetalle(detalle: DetalleMe): void {
    this.detalleSeleccionado = Object.assign({}, detalle);
  }

  submitForm(): void {
    if (this.isNew) {
    this.detalleServ.create(this.detalleSeleccionado).subscribe(() => {
    this.getDetalles();
    this.detalleSeleccionado = new DetalleMe();
    });
    } else {
    this.detalleServ.update(this.detalleSeleccionado, this.detalleSeleccionado.dmeId).subscribe(() => {
    this.getDetalles();
    this.detalleSeleccionado = new DetalleMe();
    this.isNew = true;
    });
    }
    }
  

    eliminarDetalle(dmeId: number): void {
      if (confirm('¿Está seguro que desea eliminar este detalle?')) {
        this.detalleServ.delete(dmeId).subscribe(() => {
          this.getDetalles();
        });
      }
    }

  getMecanismos(): void {
    this.mecanismoServ.getMecanismosTrue().subscribe((mecanismos) => (this.mecanismos = mecanismos));
  }

  filtro = '';

actualizarFiltro() {
  this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
}

mostrarDatosSeleccionados() {
  const detalleSeleccionado = this.mecanismos.find(mecanismo => mecanismo.mevId === this.detalleSeleccionado.mecanismoEvaluacion?.mevId);
  console.log(detalleSeleccionado);
}

}
