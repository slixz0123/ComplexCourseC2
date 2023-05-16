import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjsTemplates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router)
  {
      _CargarSc.carga_apexcharts(["apexcharts.min"])
      _CargarSc.carga_boostrap(["bootstrap.bundle.min"])
      _CargarSc.carga_echarts(["echarts.min"])
      _CargarSc.carga_quill(["quill.min"])
      _CargarSc.carga_simpledatatables(["simple-datatables"])
      _CargarSc.carga_tinymce(["tinymce.min"])
      _CargarSc.carga_phpemailform(["validate"])
      _CargarSc.carga_mainjs(["main"])
  }
  ngOnInit(): void {
  }

// metodo de redireccion de ruta
goToLogin($event: any) :void{

  this.router.navigate(['/Auth'])
  console.log($event)

 }
 goTohome($event: any) :void{

  this.router.navigate(['/'])
  console.log($event)

 }
 goToRegister($event: any) :void{

  this.router.navigate(['/register-usr'])
  console.log($event)

 }

goToCatalogo($event: any) :void{

 this.router.navigate(['/catalogo-home'])
 console.log($event)

 }
 goToServicos($event: any) :void{

  this.router.navigate(['/servicios'])
  console.log($event)

  }

  goToNosotros($event: any) :void{

    this.router.navigate(['/nosotros'])
    console.log($event)

    }
    goToHome($event: any) :void{

      this.router.navigate([''])
      console.log($event)

      }



}
