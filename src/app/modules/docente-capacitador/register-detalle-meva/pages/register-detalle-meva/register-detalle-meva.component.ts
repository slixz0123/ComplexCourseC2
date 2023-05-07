import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'bootstrap';
import { MecanismoEvaluacion } from 'src/app/Core/models/mecanismoevaluacion';
import { DetalleMe } from 'src/app/Core/models/detalleme';
import { MecanismoEvaluacionServService } from 'src/app/shared/Services/mecanismo-evaluacion-serv.service';
import { DetalleMEServService } from 'src/app/shared/Services/detalle-meva-serv.service';


@Component({
  selector: 'app-register-detalle-meva',
  templateUrl: './register-detalle-meva.component.html',
  styleUrls: ['./register-detalle-meva.component.css']
})
export class RegisterDetalleMevaComponent {
   
  mecanismos: MecanismoEvaluacion[] = [];
  detalleSelecionado: DetalleMe = new DetalleMe();
  detalles: DetalleMe[] = [];
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  detalleForm: FormGroup | undefined;
  submitted = false;
  selectedmecanismo!: MecanismoEvaluacion;

  constructor(private detalleServ: DetalleMEServService, private mecanismoServ: MecanismoEvaluacionServService) {}

  ngOnInit(): void {
    this.getMecanismos();
    this.getDetalles();
  }

  getDetalles(): void {
    this.detalleServ.getAllTrue().subscribe((detalle) => (this.detalles = detalle));
  }

  crearDetalle(): void {
    const mevId = this.detalleSelecionado?.mecanismo?.mevId ?? null; // obtenemos el mevId o null si no existe
    const data2 = {
      dmeTecnica: this.detalleSelecionado.dmeTecnica,
      dmeInstrumento: this.detalleSelecionado.dmeInstrumento,
      mecanismo: mevId
    };
  
    this.detalleServ.create(data2).subscribe(() => {
      this.getDetalles();
      this.detalleSelecionado = new DetalleMe();
    });
  }
  
  

  
  guardarDetalle(): void {
    this.detalleServ.update(this.detalleSelecionado, this.detalleSelecionado.dmeId).subscribe(() => {
      this.getDetalles();
      this.detalleSelecionado = new DetalleMe();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  editarDetalle(detalle: DetalleMe): void {
    this.detalleSelecionado = Object.assign({}, detalle);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  seleccionarDetalle(detalle: DetalleMe): void {
    this.detalleSelecionado = Object.assign({}, detalle);
  }

  submitForm(): void {
    if (this.isNew) {
    this.detalleServ.create(this.detalleSelecionado).subscribe(() => {
    this.getDetalles();
    this.detalleSelecionado = new DetalleMe();
    });
    } else {
    this.detalleServ.update(this.detalleSelecionado, this.detalleSelecionado.dmeId).subscribe(() => {
    this.getDetalles();
    this.detalleSelecionado = new DetalleMe();
    this.isNew = true;
    });
    }
    }

    eliminarDetalle(dmeId: number): void {
      if (confirm('¿Está seguro que desea eliminar este registro?')) {
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
  const mecanismoSeleccionado = this.mecanismos.find(mecanismo => mecanismo.mevId === this.detalleSelecionado.mecanismo.mevId);
  console.log(mecanismoSeleccionado);
}


}
