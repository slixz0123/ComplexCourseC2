import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';

@Component({
  selector: 'app-bienvenida-participantes',
  templateUrl: './bienvenida-participantes.component.html',
  styleUrls: ['./bienvenida-participantes.component.css']
})
export class BienvenidaParticipantesComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      
      _CargarSc.carga3(["bootstrap.bundle.min"])
  }
}
