import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
import { Persona } from 'src/app/Core/models/persona';
import { FichaIncripcionService } from 'src/app/shared/Services/fichaInscripcion.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EnvioDatosService } from 'src/app/shared/Services/envioDatos.service';


@Component({
  selector: 'app-gen-fincha-inscripcion',
  templateUrl: './gen-fincha-inscripcion.component.html',
  styleUrls: ['./gen-fincha-inscripcion.component.css']
})
export class GenFinchaInscripcionComponent {

  fichaInscripcion: FichaInscripcion = new FichaInscripcion();
  idPersona: any;
  constructor(
    private fichaIncripcionService: FichaIncripcionService,
    private fichaInscripcionServ: FichaIncripcionService,
    private enviarDatosService: EnvioDatosService,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.idPersona = localStorage.getItem('id_persona')
    this.getAllfichasIncripcion(this.idPersona);
  }
  estados: any[] = [
    { value: 0, label: 'Pendiente' },
    { value: 1, label: 'Aceptado' },
    { value: 2, label: 'Corregir' },
    { value: 3, label: 'Rechazado' }
  ];

  estadosAprobacion = ['Pendiente', 'Aceptado', 'Corregir', 'Rechazado'];

  editarAprobacion(ficha: any) {
    this.fichaInscripcion = Object.assign({}, ficha);
  }

  fichasList: any[] = [];
  getAllfichasIncripcion(idPersona: any) {
    this.fichaIncripcionService.getfichasbypersona(idPersona).subscribe((data: any) => {
      // console.log("Siiuu");
      // console.log(data);

      // Filtrar los datos por estado diferente a 1
      this.fichasList = data
      // .filter((fichaIncripcion: FichaInscripcion) => fichaIncripcion.finAprobacion !== 1);
      // console.log("fichas acep");
      // console.log(this.fichasList);
    });
  }
  goTogenfichains($event: any, ficha:FichaInscripcion): void {
    this.enviarDatosService.setficha(ficha);
    this.enviarDatosService.setIdCurso(ficha.finCurso?.curId)
    this.enviarDatosService.setvalid(1);
    this.router.navigate(['/Participante/ficha-inscripcion']);
  }

  //ficha de inscripcion -- NECESITO UN BOTON
  public async imprimirFichaInscripcion(ficha: FichaInscripcion) {
    console.log(ficha)
    this.fichaInscripcionServ
      .printFichaInscripcion(ficha)
      .subscribe((data: Blob) => {
        this.crearPdf(data, 'Ficha de inscripcion');
      });
  }

  private crearPdf(data: Blob, nombre: String) {
    const url = URL.createObjectURL(data);
    // Crear un enlace de descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = nombre + '.pdf';

    // Agregar el enlace al DOM y hacer clic en él
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Limpiar y revocar el objeto URL creado
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  }

}
