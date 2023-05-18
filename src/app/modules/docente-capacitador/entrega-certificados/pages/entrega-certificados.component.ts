import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { entregaCertificado } from 'src/app/Core/models/entregaCertificado';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { estregaCertificadoService } from 'src/app/shared/Services/entregaCertificadoServ.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';
import { EntregaCertificadosModule } from '../entrega-certificados.module';
@Component({
  selector: 'app-entrega-certificados',
  templateUrl: './entrega-certificados.component.html',
  styleUrls: ['./entrega-certificados.component.css']
})
export class EntregaCertificadosComponent {


  constructor(
    private cursoService:CursoService,
    private participanteService:ParticipanteService,
    private  entregaServi:estregaCertificadoService
    ){
    }

    
    ngOnInit(): void {
      this.listarParticipante();
      this.listarCertiicados();
    }
    participante: Participante = new Participante();
    participantes: Participante[] = [];
    certificadosForm: FormGroup | undefined;
    entrega: entregaCertificado=new entregaCertificado();
    entregas: entregaCertificado[]=[];
    submitted = false;

    filtro = '';

    actualizarFiltro() {
      this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
    }

    listarParticipante() : void{
      this.participanteService.obtenerAprobados().subscribe((data: any)=>{
        if(null != data){
          this.participantes=data;
          console.log(this.participantes);
        }else{
          console.log("no hay data");
        }
      });
    }

    listarCertiicados():void{
      this.entregaServi.listarCertificados().subscribe((data: any)=>{
        if(null != data){
          this.entregas=data;
          console.log(this.entregas);
        }else{
          console.log("no hay data");
        }
      })
    }
    
    buscar(valor: string) {
      const filas = document.getElementsByTagName("tr");
      for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        for (let j = 0; j < celdas.length; j++) {
          if (celdas[j].innerHTML.toUpperCase().indexOf(valor.toUpperCase()) > -1) {
            filas[i].style.display = "";
            break;
          } else {
            filas[i].style.display = "none";
          }
        }
      }
    }
}
