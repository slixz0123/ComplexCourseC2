import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dts-admin',
  templateUrl: './edit-dts-admin.component.html',
  styleUrls: ['./edit-dts-admin.component.css']
})
export class EditDtsAdminComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  personai: Persona = new Persona; // instancia de la clase persona 
  id_persona: any;
  constructor(
    private personaService: PersonaService
    
  ){

  }
  ngOnInit(): void {
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
    console.log("Iniciado")
  }

onSubmit() {
  this.id_persona=(this.persona.id_persona);
  console.log("esta es "+this.id_persona);
  console.log(this.persona)
  this.personaService.updatePersona(this.persona,this.id_persona).subscribe(
    (data: any) => {
      console.log('a verrr' + data);
    },
    (err) => {
      console.log(err);
    }
  );
}

public mostrarDatos(){
  this.personaService.getPorId(this.id_persona).subscribe(
      (datai: any) => {
        this. persona = datai;
      
        console.log(this.persona);
      },
    (err) => {
      console.log(err);
    }
  );
}


 /////validaciones
 fechaActual: string = new Date().toISOString().split('T')[0]; //muestra la fecha actual del sistema
 validar: claseValidaciones = new claseValidaciones();
 todosCamposVacios: boolean = true;

 verificarCamposVacios() {
   if (
     !this.persona.nombre || !this.persona.nivelintruccion || !this.persona.sexo ||
     !this.persona.apellido ||
     !this.persona.cedula ||
     !this.persona.telefono|| !this.persona.celular || !this.persona.etnia || !this.persona.email
     || !this.persona.fecha_nacimiento || !this.persona.direccion || !this.persona.hojavida
   ) {
     this.todosCamposVacios = true; // Todos los campos están vacíos
   } else {
     this.todosCamposVacios = false; // Al menos un campo no está vacío
   }
 }

 validarInputNombre() {
   if (this.persona.nombre) {
     const valid = this.validar.validarLetras(this.persona.nombre);
     if (valid) {
       this.persona.nombre = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'El nombre solo debe contener letras',
         icon: 'warning',
       });

       //Convierte la primera letra en mayuscula
       const nombre = this.persona.nombre.trim();
       const palabras = nombre.split(' ');
       const palabrasCapitalizadas = palabras.map(palabra => {
         const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
         return primeraLetraMayuscula;
       });
       const resultado = palabrasCapitalizadas.join(' ');
       this.persona.nombre = resultado;
     } else {
     }
   }
 }

   convertirPrimeraLetraMayuscula() {
   if (this.persona.apellido) {
     const nombre = this.persona.apellido.trim();
     const palabras = nombre.split(' ');
     const palabrasCapitalizadas = palabras.map(palabra => {
       const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
       return primeraLetraMayuscula;
     });
     const resultado = palabrasCapitalizadas.join(' ');
     this.persona.apellido = resultado;
   }
 }

 convertirPrimeraLetraNombre() {
  if (this.persona.nombre) {
    const nombre = this.persona.nombre.trim();
    const palabras = nombre.split(' ');
    const palabrasCapitalizadas = palabras.map(palabra => {
      const primeraLetraMayuscula = palabra.charAt(0).toUpperCase() + palabra.slice(1);
      return primeraLetraMayuscula;
    });
    const resultado = palabrasCapitalizadas.join(' ');
    this.persona.nombre = resultado;
  }
 }

 validarInputApellido() {
   if (this.persona.apellido) {
     const valid = this.validar.validarLetras(this.persona.apellido);
     if (valid) {
       this.persona.apellido = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'El apellido solo debe contener letras',
         icon: 'warning',
       });
     } else {

     }

     
   }
  
 }

 validarInputCedula() {
   if (this.persona.cedula) {
     const valid = this.validar.validarCedula(this.persona.cedula);
     if (!valid) {
       this.persona.cedula = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'La cedula es incorrecta',
         icon: 'warning',
       });
     } else {
     }
   }
 }

 validarInputEmail() {
   if (this.persona.email) {
     const valid = this.validar.validarEmail(this.persona.email);
     if (!valid) {
       this.persona.email = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'El email no cumple con las características',
         icon: 'warning',
       });
     } else {
     }
   }
 }

 validarTelf() {
   if (this.persona.telefono) {
     const valid = this.validar.validarSoloNumeros(this.persona.telefono);
     if (valid) {
       this.persona.telefono = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'El telefono no cumple con las características',
         icon: 'warning',
       });
     } else {
     }
   }
 }

 validarCel() {
   if (this.persona.celular) {
     const valid = this.validar.validarSoloNumeros(this.persona.celular);
     if (valid) {
       this.persona.celular = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'El celular no cumple con las características',
         icon: 'warning',
       });
     } else {
     }
   }
 }

 validarEtnia(){
   if (this.persona.etnia) {
     const valid = this.validar.validarLetras(this.persona.etnia);
     if (valid) {
       this.persona.etnia = '';
       Swal.fire({
         title: 'Advertencia',
         timer: 700,
         text: 'La etnia no cumple con las características',
         icon: 'warning',});
     } else {
     }
   }
 }

}
