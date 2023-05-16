import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';

@Component({
  selector: 'app-bienvenida-admin',
  templateUrl: './bienvenida-admin.component.html',
  styleUrls: ['./bienvenida-admin.component.css']
})
export class BienvenidaAdminComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      
      _CargarSc.carga3(["bootstrap.bundle.min"])
  }
}
