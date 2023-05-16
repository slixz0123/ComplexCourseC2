import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistroFotograficoService } from 'src/app/shared/Services/registro-fotografico.service';
import { RegistroFotografico } from 'src/app/Core/models/registrFotografico';
import { Curso } from 'src/app/Core/models/curso';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-fotografico',
  templateUrl: './register-fotografico.component.html',
  styleUrls: ['./register-fotografico.component.css']
})
export class RegistroFotograficoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  imagePreview: any;
  registrosFotograficos: RegistroFotografico[] = [];
  editImagePreview: any;
  
  constructor(private registroFotograficoService: RegistroFotograficoService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(''),
      date: new FormControl(''),
      photo: new FormControl('')
    });
    this.getRegistrosFotograficos();
  }

  

  getFilteredRegistrosFotograficos(): RegistroFotografico[] {
    return this.registrosFotograficos.filter(registro => registro.rfoEstado === true);
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
          photo: imgBase64.split(',')[1]
        });
      };
    }
  }

  
  
  onEdit(registro: RegistroFotografico): void {
    // Implementa la lógica para editar un registro fotográfico aquí
    console.log('Editar registro:', registro.rfoId);
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
        this.registroFotograficoService.eliminar(registro.rfoId, registro).subscribe(
          (response) => {
            console.log('Registro eliminado:', response);
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
      registro.rfoNumero = 1;
      registro.rfoEstado = true;
      curso.curId= 1;
      registro.rfoCurso = curso;
      registro.rfoDescripcion = this.form.value.description;
      registro.rfoFecha = this.form.value.date;

      const base64String = this.form.value.photo;
      const cleanedBase64String = base64String.replace("image/png;base64,", "");

      registro.rfoFoto = cleanedBase64String; // Ahora es un byte[]
      //registro.rfoFoto = 'foto q se guarda';

      console.log(registro.rfoFoto);
      this.registroFotograficoService.crear(registro).subscribe(
        (response) => {
          console.log('Registro creado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Guardado exitoso',
            text: 'El registro se guardó correctamente.',
          });
          this.form.reset(); // Limpiar los campos del formulario
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

  private validateForm(): boolean {
    let isValid = true;
  
    if (!this.form.value.description || !this.form.value.date || !this.form.value.photo) {
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