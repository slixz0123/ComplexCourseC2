import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjs-templates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-sup-admin',
  templateUrl: './side-bar-sup-admin.component.html',
  styleUrls: ['./side-bar-sup-admin.component.css']
})
export class SideBarSupAdminComponent {
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
  goToRegisteradmin($event: any) :void{

    this.router.navigate(['/Sup-Admin/Register-Admin'])
    console.log($event)
   }
   goTo_edit_list_admin($event: any) :void{

    this.router.navigate(['/Sup-Admin/edit-list-Admin'])
    console.log($event)
   }

   //////////////////////////////////////////////////////

  ngOnInit(): void {

  }
}
