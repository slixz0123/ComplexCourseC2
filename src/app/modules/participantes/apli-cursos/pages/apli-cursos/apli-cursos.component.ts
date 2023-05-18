import { Component } from '@angular/core';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';

@Component({
  selector: 'app-apli-cursos',
  templateUrl: './apli-cursos.component.html',
  styleUrls: ['./apli-cursos.component.css']
})
export class ApliCursosComponent {

  fichaIncripcion: FichaInscripcion = new FichaInscripcion();
  idPersona: any;
  constructor(
    private fichaIncripcionService: FichaIncripcionService

  ) { }

  ngOnInit(): void {
    // this.id_persona = localStorage.getItem('id_persona');
    this.idPersona = localStorage.getItem('id_persona')
    this.getAllfichasIncripcion(this.idPersona);
    console.log("esta es la id")
    console.log(this.idPersona)

  }
  
  fichasAcepList: any[] = [];
  getAllfichasIncripcion(idPersona: any) {
    this.fichaIncripcionService.getfichasbypersona(idPersona).subscribe((data: any) => {
      console.log("Siiuu");
      console.log(data);

      // Filtrar los datos por estado diferente a 1
      this.fichasAcepList = data.filter((fichaIncripcion: FichaInscripcion) => fichaIncripcion.finAprobacion !== 1);
      console.log("fichas acep");
      console.log(this.fichasAcepList);
    });
  }
}