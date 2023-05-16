import { Component } from '@angular/core';
import { Participante } from 'src/app/Core/models/participante';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { ParticipanteService } from 'src/app/shared/Services/participante.service';

@Component({
  selector: 'app-entrega-certificados',
  templateUrl: './entrega-certificados.component.html',
  styleUrls: ['./entrega-certificados.component.css']
})
export class EntregaCertificadosComponent {

  constructor(
    private cursoService:CursoService,
    private participanteService:ParticipanteService,
    ){}

    ngOnInit(): void {
      this.listarRol();
    }
    participante: Participante = new Participante();
    participantes: Participante[] = [];

    listarRol() : void{
      this.participanteService.obtenerAprobados().subscribe((data: any)=>{
        if(null != data){
          this.participante=data;
          console.log(this.participante);
        }else{
          console.log("no hay data");
        }
      });
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
