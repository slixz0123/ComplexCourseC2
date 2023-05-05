import { Component } from '@angular/core';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import * as XLSX from 'xlsx';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements AfterViewInit{
  selectedForm: string = '';
  nombre: string = '';
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.exportToExcel();
  }

  validarNombre() {
    const validaciones = new claseValidaciones();
    if (this.nombre === '') {
      return;
    }
    const esValida = validaciones.validarLetras(this.nombre);
    if (esValida) {
      alert('El nombre solo debe tener letras');
      this.nombre = '';
    }
  }


  public exportToExcel(): void {
    const table = document.getElementById('myTable');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'table.xlsx');
  }


  onSubmit() {

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
