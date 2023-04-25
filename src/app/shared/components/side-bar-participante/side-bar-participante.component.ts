import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjs-templates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-participante',
  templateUrl: './side-bar-participante.component.html',
  styleUrls: ['./side-bar-participante.component.css']
})
export class SideBarParticipanteComponent {
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
 
 
 //////////////////////////////////////////////////////
 goToReportes($event: any) :void{

  this.router.navigate(['Participante/certif-curso-aprovee'])
  console.log($event)
 }

  ngOnInit(): void {

  }
}
