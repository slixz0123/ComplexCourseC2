import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { PersonaService } from 'src/app/shared/Services/persona.service';

@Component({
  selector: 'app-edit-dts-docentes',
  templateUrl: './edit-dts-docentes.component.html',
  styleUrls: ['./edit-dts-docentes.component.css']
})
export class EditDtsDocentesComponent {
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

//  public updateSolicitudperId(id_solicitud: any, solicitudAc: any, x: number,animal: any) { 
//    // console.log(solicitudAc);
//    this.solicitudAc = { ...solicitudAc };
//    this.id_ani = (this.solicitudAc.animal?.id_animal);
//    console.log("xdddddddddd")
//    console.log("la id p" +this.id_ani)
//    console.log(this.solicitudAc);

//    if (x == 1) {
//    this.verificarestadoa(this.id_ani, id_solicitud);

//    } else if (x == 2) {
//      console.log("rechazando ")
//      this.solicitudAc.estado = 'Rechazada';
//      //editamos el estado de la solicitud
//      this.solicitudService
//        .EditarSolicitudById(id_solicitud, this.solicitudAc)
//        .subscribe(
//          (data: any) => {
//            console.log('a verrr' + data);

//            // Verificar si data es un arreglo
//            if (Array.isArray(data)) {
//              this.listALLSolicituds = data;
//            }
//            this.listarsolicitudes('Pendiente', 1);
//          },
//          (err) => {
//            console.log(err);
//          }
//        );
//    }
//  }
/////validaciones
fechaActual: string = new Date().toISOString().split('T')[0]; //muestra la fecha actual del sistema
validar: claseValidaciones = new claseValidaciones();

mostrarAvisoNombre = false;
esInvalidoNombre = false;
mostrarAdvertencia = false;
validarInputNombre() {
  if (this.persona.nombre != undefined) {
    const valid = this.validar.validarLetras(this.persona.nombre);
    if (valid) {
      this.persona.nombre = '';
      this.mostrarAdvertencia = true;
    } else {
      this.mostrarAdvertencia = false;
    }
  }
}
// this.toastr.error('El nombre no debe contener caracteres no permitidos', 'Error', {
//   positionClass: 'toast-bottom-right',
//   toastClass: 'toast-bottom-right',
// });
// this.toastr.show('El nombre debe contener solo letras', 'warn', {
//   closeButton: false,
//   timeOut: 3000,
//   positionClass: 'toast-top-right'
// });

validarInputApellido() {
  if (this.persona.apellido != undefined) {
    const valid = this.validar.validarLetras(this.persona.apellido);
    if (valid) {
      this.persona.apellido = '';
      this.mostrarAdvertencia = true;
    } else {
      this.mostrarAdvertencia = false;
    }
  }
}

validarInputCedula() {
  if (this.persona.cedula != undefined) {
    const valid = this.validar.validarCedula(this.persona.cedula);
    if (valid) {
      this.persona.cedula = '';
      this.mostrarAdvertencia = true;
    } else {
      this.mostrarAdvertencia = false;
    }
  }
}

validarInputEmail() {
  if (this.persona.email != undefined) {
    const valid = this.validar.validarEmail(this.persona.email);
    if (valid) {
      this.persona.email = '';
      this.mostrarAdvertencia = true;
    } else {
      this.mostrarAdvertencia = false;
    }
  }
}

}
