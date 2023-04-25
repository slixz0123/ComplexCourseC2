import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjs-templates.service';

@Component({
  selector: 'app-register-silabo',
  templateUrl: './register-silabo.component.html',
  styleUrls: ['./register-silabo.component.css']
})
export class RegisterSilaboComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      
      _CargarSc.carga3(["silabo"])
  }
}
