import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjsTemplates.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-side-bar-participante',
  templateUrl: './side-bar-participante.component.html',
  styleUrls: ['./side-bar-participante.component.css']
})
export class SideBarParticipanteComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router, private usuarioser: UsuarioService)
  {
      _CargarSc.carga_apexcharts(["apexcharts.min"])
      _CargarSc.carga_boostrap(["bootstrap.bundle.min"])
      _CargarSc.carga_echarts(["echarts.min"])
      _CargarSc.carga_quill(["quill.min"])
      _CargarSc.carga_simpledatatables(["simple-datatables"])
      _CargarSc.carga_tinymce(["tinymce.min"])
      _CargarSc.carga_phpemailform(["validate"])
      _CargarSc.carga3(["side"])
  }
//////////////////////////////////////////////////////
goToRegisterInscripcion($event: any) :void{

    this.router.navigate(['/Participante/ficha-inscripcion'])
    console.log($event)
   }
   goTo_gen_ficha($event: any) :void{

    this.router.navigate(['/Participante/gen-ficha-inscripcion'])
    console.log($event)
   }
   
   //////////////////////////////////////////////////////
  goTocatprogram($event: any) :void{

    this.router.navigate(['/Participante/programas-capacitacion'])
    console.log($event)
   }
   goTo_validaplicacion($event: any) :void{

    this.router.navigate(['/Participante/apli-program-capacitacion'])
    console.log($event)
   }
   goTo_estadpcurso($event: any) :void{

    this.router.navigate(['/Participante/cursos-aplicados'])
    console.log($event)
   }
   goTo_evacurso($event: any) :void{

    this.router.navigate(['/Participante/Eva-Curso'])
    console.log($event)
   }
   ////////////////////////////////////////////////////////
   goTo_ediperfil($event: any) :void{

    this.router.navigate(['/Participante/edit-dts-participante'])
    console.log($event)
   }
   goTo_visperfil($event: any) :void{

    this.router.navigate(['/Participante/vista-perfil-participante'])
    console.log($event)
   }
 
 //////////////////////////////////////////////////////
 goToReportes($event: any) :void{

  this.router.navigate(['Participante/certif-curso-aprovee'])
  console.log($event)
 }
 goToverReglamento($event: any) :void{

  this.router.navigate(['Participante/ver-reglamento'])
  console.log($event)
 }

  ngOnInit(): void {

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
          console.log(data);
       
          if (data != null) {
            this.isLogin = true;
    
            this.nombreUsuario = data.nombre + ' ' + data.apellido;
            
            console.log(data.persona?.nombre + ' ' + data.persona?.apellido)
    
          } else {
            this.isLogin = false;
            this.nombreUsuario = 'NULL';
          }
        });
      }
    }
}
