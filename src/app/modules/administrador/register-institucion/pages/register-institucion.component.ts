import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Institucion } from 'src/app/Core/models/institucion';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { institucion } from 'src/app/shared/Services/institucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-institucion',
  templateUrl: './register-institucion.component.html',
  styleUrls: ['./register-institucion.component.css']
})
export class RegisterInstitucionComponent {
  imageSize = '50px'; // Tamaño de las imágenes (ejemplo: 50px)
  fotoSeleccionada: File | null = null;
  registro: Institucion = new Institucion();
  instituciones: Institucion[] = [];
  institucionSeleccionada: Institucion = new Institucion();
  editingMode = false;


  constructor(private institucionService: institucion) { }
  agregarInstitucion() {
    if (this.editingMode) {
      this.institucionService.crear(this.registro).subscribe(
        (res) => {
          Swal.fire({
            title: 'Correcto',
            text: 'Institución editada correctamente',
            icon: 'success',
          });
          this.listarInstituciones();
          this.registro.insNombre = '';
          this.registro.insDireccion = '';
          this.selectedImage1 = null;
          this.selectedImage2 = null;
          this.selectedImage3 = null;
          this.selectedImage4 = null;
          this.selectedImage5 = null;
          this.selectedImage6 = null;
          this.todosCamposVacios=true;
        },
        (error) => {
          Swal.fire({
            title: 'ERROR',
            text: 'Error al editar la Institución',
            icon: 'error',
          });
          this.listarInstituciones();
          this.registro.insNombre = '';
          this.registro.insDireccion = '';
          this.selectedImage1 = null;
          this.selectedImage2 = null;
          this.selectedImage3 = null;
          this.selectedImage4 = null;
          this.selectedImage5 = null;
          this.selectedImage6 = null;
          this.todosCamposVacios=true;
        }
      );
    } else {
      this.institucionService.crear(this.registro).subscribe(
        (res) => {
          Swal.fire({
            title: 'Correcto',
            text: 'Institución agregada correctamente',
            icon: 'success',
          });
          this.listarInstituciones();
          this.registro.insNombre = '';
          this.registro.insDireccion = '';
          this.selectedImage1 = null;
          this.selectedImage2 = null;
          this.selectedImage3 = null;
          this.selectedImage4 = null;
          this.selectedImage5 = null;
          this.selectedImage6 = null;
          this.todosCamposVacios=true;
        },
        (error) => {
          Swal.fire({
            title: 'ERROR',
            text: 'Error al agregar la Institución',
            icon: 'error',
          });
          this.listarInstituciones();
          this.registro.insNombre = '';
          this.registro.insDireccion = '';
          this.selectedImage1 = null;
          this.selectedImage2 = null;
          this.selectedImage3 = null;
          this.selectedImage4 = null;
          this.selectedImage5 = null;
          this.selectedImage6 = null;
          this.todosCamposVacios=true;
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogo = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage1 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogoGrande = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage2 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected3(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogosec = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage3 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected4(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogogob = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage4 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected5(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogosecretariaedu = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage5 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected6(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64String) => {
        this.registro.insLogocert = base64String;
      });
    }
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.selectedImage6 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64DataUrl: string | ArrayBuffer | null = reader.result as string | ArrayBuffer | null;
        if (typeof base64DataUrl === 'string') {
          const base64String = base64DataUrl.split(',')[1]; // Obtener la segunda parte (código base64)
          resolve(base64String);
        } else {
          reject(new Error('Error al convertir el archivo a Base64'));
        }
      };
      reader.onerror = (event) => {
        reject(new Error('Error al leer el archivo'));
      };
      reader.readAsDataURL(file);
    });
  }

  /////Listar Instituciones
  ngOnInit() {
    this.todosCamposVacios=true;
    this.listarInstituciones();
  }

  listarInstituciones() {
    this.institucionService.listarTrue().subscribe(
      (data) => {
        this.instituciones = data;
      },
      (error) => {
        Swal.fire({
          title: 'ERROR',
          text: 'Error al obtener las instituciones',
          icon: 'error',
        });
      }
    );
  }
  ///editar institucion
  editForm: FormGroup = new FormGroup({});
  editarInstitucion(institucion: Institucion) {
    this.editingMode=true;
    this.institucionSeleccionada = institucion;
    this.registro = { ...this.institucionSeleccionada };

    this.selectedImage1 = 'data:image/jpeg;base64,' + institucion.insLogo;
    this.selectedImage2 = 'data:image/jpeg;base64,' + institucion.insLogoGrande;
    this.selectedImage3 = 'data:image/jpeg;base64,' + institucion.insLogosec;
    this.selectedImage4 = 'data:image/jpeg;base64,' + institucion.insLogogob;
    this.selectedImage5 = 'data:image/jpeg;base64,' + institucion.insLogosecretariaedu;
    this.selectedImage6 = 'data:image/jpeg;base64,' + institucion.insLogocert;
  }


  ///Validaciones
  validar: claseValidaciones = new claseValidaciones();
  todosCamposVacios: boolean = true;

  verificarCamposVacios() {
    if (
      !this.registro.insNombre || !this.registro.insDireccion || !this.registro.insLogo
      || !this.registro.insLogoGrande || !this.registro.insLogocert || !this.registro.insLogogob
      || !this.registro.insLogosec || !this.registro.insLogosecretariaedu
    ) {
      this.todosCamposVacios = true; // Todos los campos están vacíos
    } else {
      this.todosCamposVacios = false; // Al menos un campo no está vacío
    }
  }

  validarInputNombre() {
    if (this.registro.insNombre) {
      const valid = this.validar.validarLetras(this.registro.insNombre);
      if (valid) {
        this.registro.insNombre = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'El nombre solo debe contener letras',
          icon: 'warning',
        });
      } else {
      }
    }
  }

  validarDireccion(){
    this.verificarCamposVacios();
    const valid = this.validar.validarSoloNumeros(this.registro.insDireccion);
    if(this.registro.insDireccion!= undefined){
      if (!valid) { 
        this.registro.insDireccion = '';
        Swal.fire({
          title: 'Advertencia',
          timer: 700,
          text: 'La dirección no solo debe contener números',
          icon: 'warning',
        });
        this.todosCamposVacios=true;
      } else {
      }
    }else{

    }
  }

  convertirPrimeraLetraNombre() {
    this.verificarCamposVacios();
    if (this.registro.insNombre) {
      const nombre = this.registro.insNombre.trim();
      const palabras = nombre.split(' ');
      const palabrasCapitalizadas = palabras.map(palabra => {
        const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
        return primeraLetraMayuscula;
      });
      const resultado = palabrasCapitalizadas.join(' ');
      this.registro.insNombre = resultado;
    } else {
      this.todosCamposVacios = true;
    }
  }

  //////mostrar imagenes
  selectedImage1: any;
  selectedImage2: any;
  selectedImage3: any;
  selectedImage4: any;
  selectedImage5: any;
  selectedImage6: any;


}
