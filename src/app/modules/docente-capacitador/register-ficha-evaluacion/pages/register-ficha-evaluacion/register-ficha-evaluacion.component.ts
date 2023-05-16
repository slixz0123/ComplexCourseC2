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
import { FichaEvaluacion } from 'src/app/Core/models/fichaEvaluacion';
import { FichaEvaluacionService } from 'src/app/shared/Services/fichaEvaluacion.service';
import { DetalleFichaevaluacionService } from 'src/app/shared/Services/detalleFichaevaluacion.service';
import { Curso } from 'src/app/Core/models/curso';
import { DetalleFichaevaluacion } from 'src/app/Core/models/detalleFichaevaluacion';
import Swal from 'sweetalert2';

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
  ) {
    this.addQuestionForm = new FormGroup({
      newQuestionInput: new FormControl(''),
    });
  }

  async saveCategories() {
    const saveData = async () => {
      for (const category of this.categories) {
        const fichaEvaluacion = new FichaEvaluacion();
        const curso = new Curso();
        curso.curId = 2;
        fichaEvaluacion.fevNombre = category.name;
        fichaEvaluacion.fevCurso = curso;
        fichaEvaluacion.fevEstado = true;
  
        this.serviceFichaEvaluacion.crear(fichaEvaluacion).subscribe(
          (response) => {
            console.log('Categoría guardada:', response);
  
            for (const pregunta of category.questions) {
              const detalleFichaevaluacion = new DetalleFichaevaluacion();
              detalleFichaevaluacion.dfePregunta = pregunta;
              detalleFichaevaluacion.dfeCalificacion = '5';
              detalleFichaevaluacion.dfeEstado = true;
              detalleFichaevaluacion.fichaEvaluacion = response;
  
              this.serviceDetalleFichaEvaluacion
                .crear(detalleFichaevaluacion)
                .subscribe(
                  (response) => {
                    console.log('Pregunta guardada:', response);
                  },
                  (error) => {
                    console.error('Error al guardar la pregunta:', error);
                  }
                );
            }
          },
          (error) => {
            console.error('Error al guardar la categoría:', error);
          }
        );
      }
    };
  
    Swal.fire({
      title: '¿Estás seguro de guardar la Ficha de Evaluacion?',
      text: 'Revise las categorías y las preguntas si estan debidamente registradas antes de guardar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Guardar',
      cancelButtonText: 'Revisar de nuevo',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveData();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ficha de Evaluación guardado correctamente',
          confirmButtonText: 'IMPRIMIR',
        });
      }
    });
  }
  

  onAddQuestionSubmit(categoryName: string): void {
    const category = this.categories.find((c) => c.name === categoryName);
    const question = this.addQuestionForm.get('newQuestionInput')?.value.trim();
    if (question !== '' && category) {
      category.questions.push(question);
      Swal.fire({
        position: 'bottom',
        icon: 'success',
        title: 'Pregunta añadida a ' + categoryName,
        showConfirmButton: false,
        timer: 1500,
      });
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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Categoría ' + category.name + ' añadida!',
      showConfirmButton: false,
      timer: 1500,
    });
    this.newCategory = '';
  }

  deleteCategory(index: number, category: String) {
    this.categories.splice(index, 1);

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Categoría ' + category + ' eliminada!',
      showConfirmButton: false,
      timer: 1500,
    });
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
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Pregunta eliminada de ' + categoryName,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
