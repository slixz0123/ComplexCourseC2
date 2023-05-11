import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Area } from 'src/app/Core/models/area';
import { AreaServService } from 'src/app/shared/Services/area-serv.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register-area',
  templateUrl: './register-area.component.html',
  styleUrls: ['./register-area.component.css']
})
export class RegisterAreaComponent implements OnInit {
  
  areas: Area[] = [];
  areaSeleccionada: Area = new Area();
  editando: boolean = false;
  isNew: boolean = true; // Definición de la propiedad isNew
  areaForm: FormGroup | undefined;
  submitted = false;

  constructor(private areaServ: AreaServService) {}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaServ.getAreasTrue().subscribe((areas) => (this.areas = areas));
  }

  crearArea(): void {
    this.areaServ.saveArea(this.areaSeleccionada).subscribe(() => {
      this.getAreas();
      this.areaSeleccionada = new Area();
      console.log(this.areaSeleccionada);
      
    });
  }

  editarArea(area: Area): void {
    this.areaSeleccionada = Object.assign({}, area);
    this.editando = true;
    this.isNew = false; // Actualización del valor de isNew
  }

  guardarArea(): void {
    this.areaServ.updateArea(this.areaSeleccionada, this.areaSeleccionada.areId).subscribe(() => {
      this.getAreas();
      this.areaSeleccionada = new Area();
      this.editando = false;
      this.isNew = true; // Actualización del valor de isNew
    });
  }

  seleccionarArea(area: Area): void {
    this.areaSeleccionada = Object.assign({}, area);
  }

  eliminarArea(areId: number): void {
    if (confirm('¿Está seguro que desea eliminar esta área?')) {
      this.areaServ.deleteArea(areId).subscribe(() => {
        this.getAreas();
      });
    }
  }

  submitForm(): void {
    this.submitted = true;
    if (this.areaForm && this.areaForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.crearArea();
    } else {
      this.guardarArea();
    }
    this.areaForm?.reset();
    this.submitted = false;
    this.isNew = true;
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }

}
