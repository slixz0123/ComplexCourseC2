import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-edit-list-curso',
  templateUrl: './edit-list-curso.component.html',
  styleUrls: ['./edit-list-curso.component.css']
})
export class EditListCursoComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  personai: Persona = new Persona; // instancia de la clase persona 
  id_persona: any;
  constructor(
    private personaService: PersonaService
    
  ){

  }
  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
    //console.log("Iniciado")
  }

onSubmit() {
  this.id_persona=(this.persona.id_persona);
  // //.log("esta es "+this.id_persona);
  // //.log(this.persona)
  this.personaService.updatePersona(this.persona,this.id_persona).subscribe(
    (data: any) => {
      // //.log('a verrr' + data);
    },
    (err) => {
      // //.log(err);
    }
  );
}

public mostrarDatos(){
  this.personaService.getPorId(this.id_persona).subscribe(
      (datai: any) => {
        this. persona = datai;
      
        // //.log(this.persona);
      },
    (err) => {
      // //.log(err);
    }
  );
}
}
