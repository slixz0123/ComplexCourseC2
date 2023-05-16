import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjsTemplates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
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
   
   goTo_edit_list_silab($event: any) :void{

    this.router.navigate(['/Capacitador/edit-list-silabo'])
    console.log($event)
   }
   //////////////////////////////////////////////////////
   goToRegisterdesing($event: any) :void{

    this.router.navigate(['/Capacitador/register-diseno-curricular'])
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
      





}
