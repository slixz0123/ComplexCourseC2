import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';

@Component({
  selector: 'app-bienvenida-capacitador',
  templateUrl: './bienvenida-capacitador.component.html',
  styleUrls: ['./bienvenida-capacitador.component.css']
})
export class BienvenidaCapacitadorComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      
      _CargarSc.carga3(["bootstrap.bundle.min"])
  }
}
