import { Component } from '@angular/core';
import { ProgramaCapacitacion } from 'src/app/Core/models/ProgramaCapacitacion';
import { ProgramaCapacitacionService } from 'src/app/shared/Services/programaCapacitacion.service';

@Component({
  selector: 'app-register-program-cap',
  templateUrl: './register-program-cap.component.html',
  styleUrls: ['./register-program-cap.component.css']
})
export class RegisterProgramCapComponent {
  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion; // instancia de la clase programa Capacitacion
  id_programac: any;
  estado: boolean = true;
  constructor(
    private programaCapacitacionServ: ProgramaCapacitacionService
    
  ){

  }

  ngOnInit(): void {

    this.getAllProgramasc();
  }
  onSubmit() {
    // this.id_programac=(this.programaCapacitacion.pcaId);
    // console.log("esta es "+this.id_programac);
    console.log(this.programaCapacitacion)
    this.programaCapacitacion.pcaEstado=this.estado;
    this.programaCapacitacionServ.createProgramaCapacitacion(this.programaCapacitacion).subscribe(   
      (data: any) => {
        console.log('a verrr' + data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  programasList: any[] = [];
  public getAllProgramasc() {
    this.programaCapacitacionServ.getProgramasCapacitacion().subscribe((data: any) => {
      this.programasList = data;
    });
  }

  editarPrograma(programa: any) {
    console.log(this.programaCapacitacion.pcaFechainicio)
    const fechai = new Date(programa.pcaFechainicio);
    const fechaFormateadai = fechai.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechainicio = fechaFormateadai;
    const fechaf = new Date(programa.pcaFechafin);
    const fechaFormateadaf = fechaf.toISOString().slice(0, 10); // "2023-05-10"
    programa.pcaFechafin = fechaFormateadaf;
    this.programaCapacitacion = programa;
  }
  
}
