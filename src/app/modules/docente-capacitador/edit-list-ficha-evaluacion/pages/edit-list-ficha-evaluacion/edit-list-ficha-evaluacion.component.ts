import { Component } from '@angular/core';
import {FichaEvaluacion} from 'src/app/Core/models/ficha-evaluacion'
import {FichaEvaluacionService} from 'src/app/shared/Services/ficha-evaluacion.service'


@Component({
  selector: 'app-edit-list-ficha-evaluacion',
  templateUrl: './edit-list-ficha-evaluacion.component.html',
  styleUrls: ['./edit-list-ficha-evaluacion.component.css']
})
export class EditListFichaEvaluacionComponent {
  fichasEvaluacion: FichaEvaluacion[] = [];

  constructor(private fichaEvaluacionService: FichaEvaluacionService) { }

  ngOnInit(): void {
    this.loadFichasEvaluacion();
  }

  loadFichasEvaluacion(): void {
    this.fichaEvaluacionService.obtenerLista().subscribe(
      (data: FichaEvaluacion[]) => {
        this.fichasEvaluacion = data;
      },
      (error: any) => {
        console.error('Error al cargar las fichas de evaluación:', error);
      }
    );
  }
  editFichaEvaluacion(fichaEvaluacion: FichaEvaluacion): void {
    console.log('Editar ficha de evaluación:', fichaEvaluacion);
  }

  deleteFichaEvaluacion(fichaEvaluacion: FichaEvaluacion): void {
    console.log('Eliminar ficha de evaluación:', fichaEvaluacion);
  }
}
