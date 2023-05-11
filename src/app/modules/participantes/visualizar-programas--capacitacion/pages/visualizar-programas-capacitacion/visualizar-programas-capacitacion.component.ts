import { Component } from '@angular/core';
import { Curso } from 'src/app/Core/models/curso';
import { ProgramaCapacitacion } from 'src/app/Core/models/ProgramaCapacitacion';
import { CursoServ } from 'src/app/shared/Services/curso-serv.service';
import { ProgramaCapacitacionServ } from 'src/app/shared/Services/programaCapacitacion-serv.service';

@Component({
  selector: 'app-visualizar-programas-capacitacion',
  templateUrl: './visualizar-programas-capacitacion.component.html',
  styleUrls: ['./visualizar-programas-capacitacion.component.css']
})
export class VisualizarProgramasCapacitacionComponent {
  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();
  nprogramaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion();



  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionServ,
    private cursoService: CursoServ

  ) { }

  ngOnInit(): void {
  // this.id_persona = localStorage.getItem('id_persona');
    this.getAllProgramasc();

  }

  showContainer1: boolean = true;
  showContainer2: boolean = false;
  showContainer3: boolean = false;


  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getAllProgramasC().subscribe((data: any) => {
      this.programasList = data;
      console.log("Siiuu")
      console.log(this.programasList)
    });
  }
  cursosList: any[] = [];
  mostrarCursos(miPrograma: ProgramaCapacitacion) {
    this.cursoService.cursosporPrograma(miPrograma.pcaId).subscribe((data: any) => {
      this.cursosList = data;
      console.log("Siiuu Curso")
      console.log(this.cursosList)
    });
  }

  mostrarDatosCurso(curso: Curso){

  }
}
