import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dias } from 'src/app/Core/models/dias';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {

}
@Component({
  selector: 'app-register-dias',
  templateUrl: './register-dias.component.html',
  styleUrls: ['./register-dias.component.css']
})

export class RegisterDiasComponent {

  diaId?: number;
  diaNombre?: string;
  diaEstado?:boolean;
  DiasFiltrados: Dias[]=[];
  constructor(private formBuilder: FormBuilder,private diasservice: DiasService,private _CargarSc: CargarjsTemplatesService){
   
  }

   form= new FormGroup({
  
     diaId: new FormControl(),
     diaNombre: new FormControl(),
     diaEstado: new FormControl(), 
   });
 

  diasForm: any;
  dias: Dias = new Dias();
 
  ngOnInit(): void {
    {
      this.diasForm = this.formBuilder.group({
        diaNombre: ['', Validators.required],
      
        
      });
    }
    this.diasservice.getAll().subscribe(Dias => {
      this.DiasFiltrados = Dias.filter(Dias => Dias.diaId !== 0);
  
     
    });
  }

  registradia() {
    if (this.diasForm.valid) {
      this.dias.diaEstado = true;
      this.diasservice.post(this.dias).subscribe(
        data => {
          //console.log(data);
          this.diasForm.reset();
  
          Swal.fire({
            title: 'Día guardado',
            text: 'El día se ha guardado correctamente',
            icon: 'success'
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      Swal.fire({
        title: 'Error de validación',
        text: 'Por favor, corrija los errores del formulario no puede ingresar numeros ',
        icon: 'error'
      });
    }
  }

}





