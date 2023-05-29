import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjsTemplates.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import Swal from 'sweetalert2';
import { EnvioDatosService } from '../../Services/envioDatos.service';

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})
export class SideBarAdminComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private enviodatosService: EnvioDatosService,
    private router: Router, private usuarioser: UsuarioService) {
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
  goToRegistercurso($event: any): void {

    this.router.navigate(['/Admin/register-programs'])
    // console.log($event)
  }
  goTo_edit_list_curs($event: any): void {

    this.router.navigate(['/Admin/edit-list-programs'])
    // console.log($event)
  }
  goTo_catalogocurso($event: any): void {

    this.router.navigate(['/Admin/catalog-programs'])
    // console.log($event)
  }
  ////////////////////////////////////////////////////////
  goTo_ediperfil($event: any): void {

    this.router.navigate(['/Admin/edit-dts-admin'])
    // console.log($event)
  }
  goTo_visperfil($event: any): void {

    this.router.navigate(['/Admin/vista-perfil-admin'])
    // console.log($event)
  }
  //////////////////////////////////////////////////////
  goTovalidvida($event: any): void {

    this.router.navigate(['/Admin/valid-hojasvida-doc'])
    // console.log($event)
  }
  goTo_validcap($event: any): void {

    this.router.navigate(['/Admin/valid-cursos-cap'])
    // console.log($event)
  }


  //////////////////////////////////////////////////////
  goToReportes($event: any): void {

    this.router.navigate(['/Admin/rep-cursos-cap'])
    // console.log($event)
  }

  goToRegDocent($event: any): void {

    this.router.navigate(['/Admin/register-doc'])
    // console.log($event)
  }
  goTo_edit_docente($event: any): void {

    this.router.navigate(['/Admin/edit-doc'])
    // console.log($event)
  }
  goToRegInsti($event: any): void{
    this.router.navigate(['/Admin/reg-institucion'])
    // console.log($event)
  }
  goToverReglamento($event: any) :void{
  
      this.router.navigate(['Admin/ver-reglamento'])
      // console.log($event)
  }


  ngOnInit(): void {
    this.obtenerUsuario()
  }

  id: any;
     nombreUsuario: any;
     nombreRol: any;
   

   
     isSuperAdmin: boolean = false;
     isClientAdmin: boolean = false;
     isparticipante: boolean = false;
     isadmin: boolean = false;
     isdocente: boolean = false;
   
     displayMaximizable: any;
     isLogin: boolean = false;
     obtenerUsuario() {
      this.id = localStorage.getItem('id_persona');
      if (this.id != '' && this.id != undefined) {
        this.usuarioser.getPersona(this.id).subscribe((data) => {
          // console.log(data);
       
          if (data != null) {
            this.isLogin = true;
    
            this.nombreUsuario = data.nombre + ' ' + data.apellido;
            
            // console.log(data.persona?.nombre + ' ' + data.persona?.apellido)
    
          } else {
            this.isLogin = false;
            this.nombreUsuario = 'NULL';
          }
        });
      }
    }

    Cerrarsesion() {
      //pregunta de verificacion
      Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: '¿Desea cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Éxito!', 'Gracias por visitarnos', 'success');
          this.enviodatosService.setCerrarsesion(true)
          this.router.navigate([''])
        }
      });
    }
}
