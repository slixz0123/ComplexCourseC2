import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';

@Component({
  selector: 'app-bienvenida-sup-admins',
  templateUrl: './bienvenida-sup-admins.component.html',
  styleUrls: ['./bienvenida-sup-admins.component.css']
})
export class BienvenidaSupAdminsComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      
      _CargarSc.carga3(["bootstrap.bundle.min"])
  }
}
