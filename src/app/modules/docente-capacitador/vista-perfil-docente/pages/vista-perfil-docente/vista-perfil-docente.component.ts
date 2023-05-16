import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-vista-perfil-docente',
  templateUrl: './vista-perfil-docente.component.html',
  styleUrls: ['./vista-perfil-docente.component.css']
})
export class VistaPerfilDocenteComponent implements OnInit{
  public persona: Persona = new Persona();
    //Edad de la persona:
    edadPersona: any;
    id_persona: any;
  constructor(
    private personaService: PersonaService,
    private cursoService: CursoService,
    private router : Router

    
  ){

  }
  ngOnInit( ): void {
      this.id_persona = localStorage.getItem('id_persona');
      this.mostrarDatos();
      this.mostrarCursosDocente();
  }

public mostrarDatos(){
  this.personaService.getPorId(this.id_persona).subscribe(
      (data: any) => {
        this. persona = data;
      
        console.log(this.persona);
      },
    (err) => {
      console.log(err);
    }
  );
}
cursoList: any[] = [];
public mostrarCursosDocente(){
  this.cursoService.cursosporDocente(this.id_persona).subscribe(
      (data: any) => {
        this.cursoList = data;
      
        console.log(this.cursoList);
      },
    (err) => {
      console.log(err);
    }
  );
}
goToeditprofile($event: any) :void{

  this.router.navigate(['Capacitador/edit-dts'])
  console.log($event)
 }
}
