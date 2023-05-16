import { Component } from '@angular/core';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';

@Component({
  selector: 'app-cursos-aplicados',
  templateUrl: './cursos-aplicados.component.html',
  styleUrls: ['./cursos-aplicados.component.css']
})
export class CursosAplicadosComponent {
  fichaIncripcion: FichaInscripcion = new FichaInscripcion();

  constructor(
    private fichaIncripcionService: FichaIncripcionService

  ) { }

  ngOnInit(): void {
    // this.id_persona = localStorage.getItem('id_persona');
    this.getAllfichasIncripcion();

  }
  fichasList: any[] = [];
  getAllfichasIncripcion() {
    this.fichaIncripcionService.getAllFichaIncripcion().subscribe((data: any) => {
      this.fichasList = data;
      console.log("Siiuu")
      console.log(this.fichasList)
    });
  }
}

