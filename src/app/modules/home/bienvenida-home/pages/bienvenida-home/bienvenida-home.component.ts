import { Component, OnInit } from '@angular/core';
import { CargarjsHomeService } from '../../../services/cargarjs-home.service';
import { Router } from '@angular/router';
import {ProgramaCapacitacion} from 'src/app/Core/models/programa-capacitacion'
import {ProgramaCapacitacionService} from 'src/app/shared/Services/programa-capacitacion.service'
import {CursoServ} from 'src/app/shared/Services/curso-serv.service'
import {Curso} from 'src/app/Core/models/curso'

@Component({
  selector: 'app-bienvenida-home',
  templateUrl: './bienvenida-home.component.html',
  styleUrls: ['./bienvenida-home.component.css']
})
export class BienvenidaHomeComponent implements OnInit{
  programas: ProgramaCapacitacion[] = [];
  cursos: { [key: number]: Curso[] } = {};
  
  constructor(
    private _CargarSc: CargarjsHomeService, private router : Router, private programaCapacitacionService: ProgramaCapacitacionService, private cursoService: CursoServ)
  {
      
      _CargarSc.carga_boost(["bootstrap"])
    
  }

  ngOnInit(): void {
    this.getProgramasCapacitacion();
  }

  getProgramasCapacitacion(): void {
    this.programaCapacitacionService.getProgramasCapacitacion().subscribe((programas) => {
      this.programas = programas;
      this.programas.forEach(programa => {
        this.cursoService.cursosporPrograma(programa.pcaId).subscribe((cursos: Curso[]) => {
          this.cursos[programa.pcaId] = cursos;
        });
      });
    });
  }
//////////////////////////////////////////////////////
goToRegister($event: any) :void{

    this.router.navigate(['/register-usr'])
    console.log($event)
   }

   goTologin($event: any) :void{

    this.router.navigate(['/Auth'])
    console.log($event)
   }


}
