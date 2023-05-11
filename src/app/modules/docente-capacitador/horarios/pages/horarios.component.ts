import { Component, OnInit} from '@angular/core';
import { Horario } from 'src/app/Core/models/Horario';
import { horarioService } from 'src/app/shared/Services/horario-serv.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit{

  selectedForm: string = '';
  nombre: string = '';
  constructor(private horarioService: horarioService) { }
  horario: Horario=new Horario();
  horarios: Horario[] | undefined;
  formularioValido: boolean| undefined;

  onSearchInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.buscar(searchTerm);
  }

  onFormInputChange() {
    if (this.horario.horInicio && this.horario.horFin) {
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }
  
  seleccionarHorario(horario: any) {
    this.horario = Object.assign({}, horario); // crea una copia del objeto para evitar cambios no deseados
    this.formularioValido=true;
  }

  ngOnInit(){

  }
 
  onSubmit(){
    
  }

  listarHorarios(): void{
    this.horarioService.listarHorarios().subscribe((response: Horario[])=>{
      
      console.log(this.horarios=response)
    })
  }

  registrarHorario(){
    this.horarioService.crearHorario(this.horario).subscribe(res => {
      console.log('Horario registrado exitosamente');
    }, error => {
      console.log('Error al registrar el horario', error);
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
