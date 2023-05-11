import { Component, OnInit } from '@angular/core';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { Persona } from 'src/app/Core/models/persona';

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
    private personaService: PersonaServService
    
  ){

  }
  ngOnInit( ): void {
      this.id_persona = localStorage.getItem('id_persona');
      this.mostrarDatos();


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
}
