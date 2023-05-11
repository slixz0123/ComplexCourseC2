import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FichaEvaluacion } from 'src/app/Core/models/ficha-evaluacion'
import { FichaEvaluacionService } from 'src/app/shared/Services/ficha-evaluacion.service';
import { DetalleFichaevaluacionService } from 'src/app/shared/Services/detalle-ficha-evaluacion.service';
import { Cursos } from 'src/app/Core/models/curso';
import { DetalleFichaevaluacion } from 'src/app/Core/models/detalle-ficha-evaluacion';



class Category {
  name: string = '';
  questions: string[] = [];
}

@Component({
  selector: 'app-register-ficha-evaluacion',
  templateUrl: './register-ficha-evaluacion.component.html',
  styleUrls: ['./register-ficha-evaluacion.component.css'],
})
export class RegisterFichaEvaluacionComponent {
  newCategory = '';
  newQuestion = '';
  currentCategoryIndex: number = 0;
  categories: Category[] = [];
  addQuestionModalInstance: any;
  addQuestionForm: FormGroup;
  selectedCategoryName = '';
  questionIdCounter = 1;

  @Input() isModalVisible = false;
  @Output() onClose = new EventEmitter<void>();
  @ViewChild('addQuestionModal') addQuestionModal!: ElementRef | null;

  constructor(
    private serviceFichaEvaluacion: FichaEvaluacionService,
    private serviceDetalleFichaEvaluacion: DetalleFichaevaluacionService
  ) 
  {    
    this.addQuestionForm = new FormGroup({
      newQuestionInput: new FormControl(''),
    });
  }
  
  saveCategories() {
    for (const category of this.categories) {
      const fichaEvaluacion = new FichaEvaluacion();
      const curso = new Cursos();
      curso.curId = 2;
      fichaEvaluacion.fevNombre = category.name;
      fichaEvaluacion.fevCurso = curso; // Asigna un objeto Cursos con el ID que necesitas
      fichaEvaluacion.fevEstado = true;
  
      this.serviceFichaEvaluacion.crear(fichaEvaluacion).subscribe(response => {
        console.log('Categoría guardada:', response);
  
        // Guarda las preguntas de la categoría guardada
        for (const pregunta of category.questions) {
          const detalleFichaevaluacion = new DetalleFichaevaluacion();
          detalleFichaevaluacion.dfePregunta = pregunta;
          detalleFichaevaluacion.dfeCalificacion = '5';
          detalleFichaevaluacion.dfeEstado = true;
          detalleFichaevaluacion.fichaEvaluacion = response;
  
          this.serviceDetalleFichaEvaluacion.crear(detalleFichaevaluacion).subscribe(response => {
            console.log('Pregunta guardada:', response);
          }, error => {
            console.error('Error al guardar la pregunta:', error);
          });
        }
  
      }, error => {
        console.error('Error al guardar la categoría:', error);
      });
    }
  }

  onAddQuestionSubmit(categoryName: string): void {
    const category = this.categories.find((c) => c.name === categoryName);
    const question = this.addQuestionForm.get('newQuestionInput')?.value.trim();
    if (question !== '' && category) {
      category.questions.push(question);
    }

    const modalElement = this.addQuestionModal?.nativeElement;
    if (modalElement) {
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      if (bsModal) {
        bsModal.hide();
      }
    }

    this.addQuestionForm.reset();
  }

  addCategory() {
    if (this.newCategory.trim() === '') return;

    const category: Category = {
      name: this.newCategory.trim(),
      questions: [],
    };

    this.categories.push(category);
    this.newCategory = '';
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }

  addQuestion(categoryName: string): void {
    this.selectedCategoryName = categoryName;

    if (this.addQuestionModal?.nativeElement) {
      const modalElement = this.addQuestionModal.nativeElement;
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();
    }
  }

  deleteQuestion(categoryName: string, questionIndex: number): void {
    const category = this.categories.find((c) => c.name === categoryName);
    if (category) {
      category.questions.splice(questionIndex, 1);
    }
  }
}
