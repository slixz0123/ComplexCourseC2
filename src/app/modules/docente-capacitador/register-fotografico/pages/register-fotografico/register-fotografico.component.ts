import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistroFotograficoService } from 'src/app/shared/Services/registroFotografico.service';
import { RegistroFotografico } from 'src/app/Core/models/registrFotografico';
import { Curso } from 'src/app/Core/models/curso';
import Swal from 'sweetalert2';
import { CursoService } from 'src/app/shared/Services/curso.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-register-fotografico',
  templateUrl: './register-fotografico.component.html',
  styleUrls: ['./register-fotografico.component.css'],
})
export class RegistroFotograficoComponent implements OnInit {
  @ViewChild('editPhotoInput', { static: false }) editPhotoInput!: ElementRef;
  @ViewChild('preview') previewElement!: ElementRef;

  form: FormGroup = new FormGroup({});
  imagePreview: any;
  registrosFotograficos: RegistroFotografico[] = [];
  editImagePreview: any;
  curso: Curso = new Curso(); // instancia de la clase asistencia curso
  idPersona: any;
  estado: boolean = true;
  showContainer1: boolean = true;
  showContainer2: boolean = false;
  selectedCursoId!: number;
  selectedFoto?: RegistroFotografico;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private registroFotograficoService: RegistroFotograficoService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(''),
      date: new FormControl(''),
      photo: new FormControl(''),
    });
    this.editForm = new FormGroup({
      descriptionModal: new FormControl(''),
      dateModal: new FormControl(''),
      photoModal: new FormControl(''),
      originalPhotoModal: new FormControl(''),
    });

    this.getRegistrosFotograficos();
    this.idPersona = localStorage.getItem('id_persona');
    this.mostrarCursos(this.idPersona);
  }

  cursosList: any[] = [];
  mostrarCursos(idPersona: any) {
    this.cursoService.cursosporDocente(idPersona).subscribe((data: any) => {
      // Filtrar los datos por estado diferente a finalizado
      this.cursosList = data.filter(
        (curso: Curso) => curso.curProceso !== 'Finalizado'
      );
    });
  }

  selectCurso(cursoId: number): void {
    this.selectedCursoId = cursoId;
    this.showContainer1 = false;
    this.showContainer2 = true;
  }

  getFilteredRegistrosFotograficos(): RegistroFotografico[] {
    return this.registrosFotograficos.filter(
      (registro) =>
        registro.rfoEstado === true &&
        registro.rfoCurso.curId === this.selectedCursoId
    );
  }

  getRegistrosFotograficos(): void {
    this.registroFotograficoService.listar().subscribe((registros) => {
      this.registrosFotograficos = registros;
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.form.patchValue({
          photo: imgBase64.split(',')[1],
        });
        this.imagePreview = imgBase64;
      };
    }
  }

  onEdit(registro: RegistroFotografico): void {
    this.selectedFoto = registro;

    let fecha = new Date(registro.rfoFecha);
    // Ajustar fecha a la zona horaria local
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());

    let formattedDate = fecha.toISOString().split('T')[0];

    this.editForm.setValue({
      descriptionModal: registro.rfoDescripcion,
      dateModal: formattedDate,
      photoModal: null,
      originalPhotoModal: this.getImageSrc(registro.rfoFoto),
    });

    this.editImagePreview = this.getImageSrc(registro.rfoFoto);

    const editModalElement = document.getElementById('editModal');
    if (editModalElement) {
      const editModal = new bootstrap.Modal(editModalElement);
      editModal.show();
    }

    
  }

  onDelete(registro: RegistroFotografico): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        registro.rfoEstado = false;
        this.registroFotograficoService
          .eliminar(registro.rfoId, registro)
          .subscribe(
            (response) => {
              
              Swal.fire({
                icon: 'success',
                title: 'Eliminado exitoso',
                text: 'El registro se eliminó correctamente.',
              });
              this.getRegistrosFotograficos();
            },
            (error) => {
              console.error('Error al eliminar el registro:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Hubo un problema al eliminar el registro. Por favor, intente de nuevo.',
              });
            }
          );
      }
    });
  }

  getImageSrc(base64: string): string {
    return 'data:image/jpeg;base64,' + base64;
  }

  onSubmit(): void {
    
    if (!this.validateForm()) {
      return;
    }
    if (this.form.valid) {
      const registro = new RegistroFotografico();
      const curso = new Curso();
      registro.rfoNumero = this.selectedCursoId;
      registro.rfoEstado = true;
      curso.curId = this.selectedCursoId;
      registro.rfoCurso = curso;
      registro.rfoDescripcion = this.form.value.description;
      registro.rfoFecha = this.form.value.date;

      const base64String = this.form.value.photo;
      const cleanedBase64String = base64String.replace('image/png;base64,', '');

      registro.rfoFoto = cleanedBase64String; // Ahora es un byte[]

      
      this.registroFotograficoService.crear(registro).subscribe(
        (response) => {
          
          Swal.fire({
            icon: 'success',
            title: 'Guardado exitoso',
            text: 'El registro se guardó correctamente.',
          });
          this.form.reset(); // Limpiar los campos del formulario
          this.editPhotoInput.nativeElement.value = '';
          this.imagePreview = null;
          this.form.get('photo')?.reset();

          this.getRegistrosFotograficos();
        },
        (error) => {
          console.error('Error al crear el registro:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Hubo un problema al guardar el registro. Por favor, intente de nuevo.',
          });
        }
      );
    }
  }

  onEditFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.editForm.patchValue({
          photoModal: imgBase64.split(',')[1],
        });
        this.editImagePreview = imgBase64;
      };
    } else {
      // Si no hay un archivo seleccionado, establecemos `photoModal` y `editImagePreview` a `null`.
      this.editForm.patchValue({
        photoModal: null,
      });
      this.editImagePreview = null;
    }
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.editForm.patchValue({
        photoModal: null,
      });
      this.editImagePreview = null;
    };
  }

  guardarEditar(): void {
    if (this.editForm.valid && this.selectedFoto) {
      const registro = new RegistroFotografico();
      const curso = new Curso();
      registro.rfoNumero = this.selectedCursoId;
      registro.rfoEstado = true;
      curso.curId = this.selectedCursoId;
      registro.rfoCurso = curso;
      registro.rfoDescripcion = this.editForm.value.descriptionModal;
      registro.rfoFecha = this.editForm.value.dateModal;

      if (this.editForm.value.photoModal) {
        registro.rfoFoto = this.editForm.value.photoModal;
        
      } 
      this.registroFotograficoService
        .actualizar(this.selectedFoto.rfoId, registro)
        .subscribe(
          (response) => {
            
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'El registro se actualizó correctamente.',
            });
            this.editForm.reset(); // Limpiar los campos del formulario
            this.editPhotoInput.nativeElement.value = '';
            this.editImagePreview = null;
            this.editForm.get('photoModal')?.reset();

            this.getRegistrosFotograficos();
          },
          (error) => {
            console.error('Error al actualizar el registro:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar',
              text: 'Hubo un problema al actualizar el registro. Por favor, intente de nuevo.',
            });
          }
        );
    }
  }

  private validateForm(): boolean {
    let isValid = true;

    if (
      !this.form.value.description ||
      !this.form.value.date ||
      !this.form.value.photo
    ) {
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Campos faltantes',
        text: 'Por favor, complete todos los campos antes de guardar.',
      });
    }

    return isValid;
  }
}
