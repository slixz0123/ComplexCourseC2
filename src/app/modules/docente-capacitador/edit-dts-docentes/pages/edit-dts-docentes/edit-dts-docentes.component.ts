import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
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
  selectedFile: any;
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
    const fileInput = document.getElementById('hojavida') as HTMLInputElement;
    const file = fileInput.files?.[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
  
        if (base64String) {
          this.persona.hojavida = base64String;
  
          setTimeout(() => {
            // Restablecer el valor del campo de entrada de archivo a una cadena vacía
            fileInput.value = '';
  
            // Eliminar el campo de entrada de archivo
            fileInput.parentNode?.removeChild(fileInput);
          }, 0);
  
          this.personaService.updatePersona(this.persona, this.id_persona).subscribe(
            (data: any) => {
              console.log('Datos guardados en la base de datos');
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.error('Error al convertir el archivo a cadena base64');
        }
      };
  
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
      };
  
      reader.readAsDataURL(file);
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
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

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
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
}
