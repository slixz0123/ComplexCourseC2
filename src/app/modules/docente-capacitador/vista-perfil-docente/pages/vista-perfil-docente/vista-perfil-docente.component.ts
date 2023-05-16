import { Component, OnInit } from '@angular/core';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { Persona } from 'src/app/Core/models/persona';
import { CursoServ } from 'src/app/shared/Services/curso-serv.service';

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
    private personaService: PersonaServService,
    private cursoService: CursoServ

    
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
}
