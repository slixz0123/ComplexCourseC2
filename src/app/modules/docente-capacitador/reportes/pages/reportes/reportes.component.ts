import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent {
  selectedForm: string = 'reportesEstudiantes';

  ngOnInit(){

  }

  onSubmit(){

  }
  
  onSearchInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.buscar(searchTerm);
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
