import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Core/models/persona';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-reporte-cursos-capcacitacion',
  templateUrl: './reporte-cursos-capcacitacion.component.html',
  styleUrls: ['./reporte-cursos-capcacitacion.component.css']
})
export class ReporteCursosCapcacitacionComponent {
  public persona: Persona = new Persona();
  //Edad de la persona:
  edadPersona: any;
  id_persona: any;
  constructor(
    private personaService: PersonaService,
    private cursoService: CursoService,
    private router: Router


  ) {

  }
  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
    // this.mostrarCursosDocente();
  }

  public mostrarDatos() {
    this.personaService.getPorId(this.id_persona).subscribe(
      (data: any) => {
        this.persona = data;

        console.log(this.persona);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToeditprofile($event: any): void {

    this.router.navigate(['/Admin/edit-list-programs'])
    console.log($event)
  }

}
