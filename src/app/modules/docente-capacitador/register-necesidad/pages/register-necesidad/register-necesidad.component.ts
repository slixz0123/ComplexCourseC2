import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/Core/models/cursos';
import { Dias } from 'src/app/Core/models/dias';
import { Modalidadcurso } from 'src/app/Core/models/modalidadcurso';
import { NecesidadCurso } from 'src/app/Core/models/necesidadcurso';
import { TiposCurso } from 'src/app/Core/models/tiposcurso';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { DiasService } from 'src/app/shared/Services/dias.service';
import { ModalidadsercService } from 'src/app/shared/Services/modalidadserc.service';
import { NecesidadCursoserviceService } from 'src/app/shared/Services/necesidad-cursoservice.service';


@Component({
  selector: 'app-register-necesidad',
  templateUrl: './register-necesidad.component.html',
  styleUrls: ['./register-necesidad.component.css'],
  template:`
  <select>
    <option *ngFor="let clase of claseauto">{{clase}}</option>
  </select>
`
})
export class RegisterNecesidadComponent {

  neceForm!: FormGroup;

 
  selectedId3: Dias = new Dias();

  necesidadcurso!: NecesidadCurso;
 

  diasnew!: Dias;
  arraydias : Dias[]=[];

  necesidad: NecesidadCurso = new NecesidadCurso;



    newdias: Dias = new Dias; 



    constructor(private necesidadserv: NecesidadCursoserviceService, private diaserv:DiasService,private formbuilder:FormBuilder) {
      }
  
      ngOnInit(): void {
        this.necesidad.ncuId = 0;
        this.necesidad.ncuLugardicta= '';
        this.necesidad.ncuNumparticipantes = 0;
        this.necesidad.ncuPoblaciondirigida = '';
        this.necesidad.ncuResumenyproyecto = '';
        this.necesidad.ncuEstado = true;     
        this.newdias.diaId=0;
        localStorage.removeItem('num_placa');  
        this.getdias();
        this.vertdia();

        this.neceForm = this.formbuilder.group({
      
          ncuId: ['', Validators.required],
          ncuFechaprevisfin: ['', Validators.required],
          ncuNumparticipantes: ['', Validators.required],
          ncuResumenyproyecto: ['', Validators.required],
          ncuLugardicta: ['', Validators.required],
          ncuEstado: ['', Validators.required],
          ncuPoblaciondirigida: ['', Validators.required],

        });
        this.neceForm = new FormGroup({
 
          ncuId: new FormControl(),
 
          ncuFechaprevisfin: new FormControl(),
          ncuNumparticipantes: new FormControl(),
          ncuResumenyproyecto: new FormControl(),
          ncuLugardicta: new FormControl(),
          ncuEstado: new FormControl(),
          ncuPoblaciondirigida:new FormControl(),

        });
      }



  sendData3(selectedValue2: number) {

    const payload = { id: selectedValue2 };
    this.diaserv.getPorId( payload).subscribe(
      (response) => {
        console.log('Solicitud POST enviada con éxito:', response);
      },
      (error) => {
        console.log('Error al enviar la solicitud POST:', error);
      }
    );
  }


  getdias(){
        this.diaserv.getAll().subscribe(
          clasedia =>this.arraydias = clasedia.filter(clasedia=>clasedia.diaEstado!==false)

        );}





  vertdia(){
      this.diaserv.getAll().subscribe(
         result => {
        console.log(result)
        })
       this.diaserv.getPorId(this.newdias.diaId).subscribe(
        result => {
        console.log(result)
        })
      }


  onSelectChange3(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    if (!selectElement) {
      return; 
    }
  
    const selectedValue = selectElement.value;
    console.log(selectedValue); 
    this.selectedId3.diaId = Number(selectedValue);
  }

crearcurso(){
   
      this.necesidad.dia =  this.selectedId3
     
      this.diaserv.getById(this.necesidad.dia.diaId).subscribe(diadata => {
       console.log(diadata);
     
       this.necesidad.dia = diadata
       this.necesidad.ncuEstado = true
      
        this.necesidadserv.post(this.necesidad).subscribe(dataprod => {
        console.log(dataprod);
          
      })
    })

}

}
