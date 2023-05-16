import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dias } from 'src/app/Core/models/dias';
import { CargarjsTemplatesService } from 'src/app/shared/Services/cargarjsTemplates.service';
import { DiasService } from 'src/app/shared/Services/dias.service';

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
    this.dias.diaEstado=true 
    this.diasservice.post(this.dias).subscribe(
      data => {
        console.log( data);
      
         this.diasForm.reset();   
      },
      error => {
        console.error(error);
      }

    )

}







}
