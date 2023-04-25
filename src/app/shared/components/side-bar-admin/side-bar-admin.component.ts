import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjs-templates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})
export class SideBarAdminComponent {
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
      _CargarSc.carga3(["side"])
  }
//////////////////////////////////////////////////////
  goToRegistercurso($event: any) :void{

    this.router.navigate(['/Admin/register-programs'])
    console.log($event)
   }
   goTo_edit_list_curs($event: any) :void{

    this.router.navigate(['/Admin/edit-list-programs'])
    console.log($event)
   }
   goTo_catalogocurso($event: any) :void{

    this.router.navigate(['/Admin/catalog-programs'])
    console.log($event)
   }
   //////////////////////////////////////////////////////
  goTovalidvida($event: any) :void{

    this.router.navigate(['/Admin/valid-hojasvida-doc'])
    console.log($event)
   }
   goTo_validcap($event: any) :void{

    this.router.navigate(['/Admin/valid-cursos-cap'])
    console.log($event)
   }
 
 
 //////////////////////////////////////////////////////
 goToReportes($event: any) :void{

  this.router.navigate(['/Admin/rep-cursos-cap'])
  console.log($event)
 }

  ngOnInit(): void {

  }
}
