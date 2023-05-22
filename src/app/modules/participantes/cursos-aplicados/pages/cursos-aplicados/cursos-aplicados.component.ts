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
  idPersona:any;
  constructor(
    private fichaIncripcionService: FichaIncripcionService

  ) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona')
    this.getAllfichasIncripcion(this.idPersona);

  }
  fichasList: any[] = [];
  getAllfichasIncripcion(idPersona: any) {
    this.fichaIncripcionService.getfichasbypersona(idPersona).subscribe((data: any) => {
      this.fichasList = data;
      console.log("Siiuu")
      console.log(this.fichasList)
    });
  }
}

