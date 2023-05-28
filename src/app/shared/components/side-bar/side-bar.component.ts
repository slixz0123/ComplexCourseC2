import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjsTemplates.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService, private router : Router,private usuarioser: UsuarioService)
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
  goToRegisterNed($event: any) :void{

    this.router.navigate(['/Capacitador/register-necesidad'])
    console.log($event)
   }
   goTo_edit_list_Ned($event: any) :void{

    this.router.navigate(['/Capacitador/edit-list-necesidad'])
    console.log($event)
   }
   //////////////////////////////////////////////////////
   goToRegistersilab($event: any) :void{

    this.router.navigate(['/Capacitador/register-silabo'])
    console.log($event)
   }
   //////////////////////////////////////////////////////////////////
   goToeditcursoCap($event: any) :void{

    this.router.navigate(['Capacitador/edit-list-curso'])
    console.log($event)
   }
   
   goTo_edit_list_silab($event: any) :void{

    this.router.navigate(['/Capacitador/edit-list-silabo'])
    console.log($event)
   }
   //////////////////////////////////////////////////////
   goToRegisterdesing($event: any) :void{

    this.router.navigate(['/Capacitador/register-diseno-curricular'])
    console.log($event)
   }

   goToRegisterPhoto($event: any) :void{

    this.router.navigate(['/Capacitador/register-fotografico'])
    console.log($event)
   }
    //////////////////////////////////////////////////////
      goToRegisternotas($event: any) :void{

        this.router.navigate(['/Capacitador/register-notas'])
        console.log($event)
       }
       
       goTo_edit_list_notas($event: any) :void{
    
        this.router.navigate(['/Capacitador/edit-list-notas'])
        console.log($event)
       }
      //////////////////////////////////////////////////////
      goToRegisterasis($event: any) :void{

        this.router.navigate(['/Capacitador/register-asistencia'])
        console.log($event)
       }
       
       goTo_edit_list_sis($event: any) :void{
    
        this.router.navigate(['/Capacitador/edit-list-asistencia'])
        console.log($event)
       }   
 //////////////////////////////////////////////////////
 goToReportes($event: any) :void{

  this.router.navigate(['Capacitador/reportes-capacitador'])
  console.log($event)
 }


   //////////////////////////////////////////////////////
 goToeditprofile($event: any) :void{

  this.router.navigate(['Capacitador/edit-dts'])
  console.log($event)
 }

   //////////////////////////////////////////////////////
 goToprofile($event: any) :void{

  this.router.navigate(['Capacitador/profile'])
  console.log($event)
 }

  ngOnInit(): void {

    this.obtenerUsuario()
  }

   //////////////////////////////////////////////////////
 goToregisterarea($event: any) :void{

  this.router.navigate(['Capacitador/register-area'])
  console.log($event)
 }

    //////////////////////////////////////////////////////
    goToregisespecialidad($event: any) :void{

    this.router.navigate(['Capacitador/register-esp'])
    console.log($event)
   } 


         //////////////////////////////////////////////////////
    goToregisdays($event: any) :void{

      this.router.navigate(['Capacitador/register-dias'])
      console.log($event)
     }
  
        //////////////////////////////////////////////////////
        goTo_edit_list_days($event: any) :void{
  
          this.router.navigate(['Capacitador/edit-list-dias'])
          console.log($event)
         }

         //////////////////////////////////////////////////////
  goToregistermecanismos($event: any) :void{

    this.router.navigate(['Capacitador/register-mecanismo-eva'])
    console.log($event)
   }
  
    //////////////////////////////////////////////////////
    goToeditDetalleME($event: any) :void{
  
      this.router.navigate(['Capacitador/register-detalle-meva'])
      console.log($event)
     }
    //////////////////////////////////////////////////////////////////
     goToregisentorno($event: any) :void{

      this.router.navigate(['Capacitador/register-entorno-aprendizaje'])
      console.log($event)
     }
     //////////////////////////////////////////////////////////////////
    goToregiscursoCap($event: any) :void{

      this.router.navigate(['Capacitador/register-cur'])
      console.log($event)
     }
      //////////////////////////////////////////////////////////////////
    goToregisHorario($event: any) :void{

      this.router.navigate(['Capacitador/horarios'])
      console.log($event)
     }

     //////////////////////////////////////////////////////////////////
    goToregisTipoCur($event: any) :void{

      this.router.navigate(['Capacitador/tipo-cursos'])
      console.log($event)
     }

     //////////////////////////////////////////////////////////////////
    goToregisModalidadCur($event: any) :void{

      this.router.navigate(['Capacitador/modalidad'])
      console.log($event)
     }

     //////////////////////////////////////////////////////
   goToRegisterparticipante($event: any) :void{

    this.router.navigate(['/Capacitador/register-participante'])
    console.log($event)
    }

     //////////////////////////////////////////////////////////////////
    goToregisHorarioCur($event: any) :void{

      this.router.navigate(['Capacitador/horario-cursos'])
      console.log($event)
     }

     //////////////////////////////////////////////////////////////////
    goToregisFichaEva($event: any) :void{

      this.router.navigate(['Capacitador/register-fichaEvaluacion'])
      console.log($event)
     }
     //////////////////////////////////////////////////////////////////
    goToverReglamento($event: any) :void{

      this.router.navigate(['Capacitador/ver-reglamento'])
      console.log($event)
     }

     //////////////////////////////////////////////////////////////////
    goToverCertificado($event: any) :void{

      this.router.navigate(['Capacitador/entrega'])
      console.log($event)
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
       
          if (data != null) {
            this.isLogin = true;
    
            this.nombreUsuario = data.nombre + ' ' + data.apellido;
            
           
    
            // switch (data.rol?.rolNombre) {
    
            //   case 'Participante':
    
            //     this.isparticipante = true;
    
            //     break;
            //     case 'Supadmin':
    
            //     this.isSuperAdmin = true;
    
            //     break;
            //     case 'Admin':
    
            //     this.isadmin = true;
    
            //     break;
    
            //   case 'Docente':
            //     this.isdocente = true;
               
            //     break;
            //   default:
            //     alert('Rol desconocido');
            //     break;
            // };
    
          } else {
            this.isLogin = false;
            this.nombreUsuario = 'NULL';
          }
        });
      }
    }



}
