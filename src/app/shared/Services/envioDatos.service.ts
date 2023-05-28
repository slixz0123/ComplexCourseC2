import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FichaInscripcion } from 'src/app/Core/models/fichaInscripcion';
@Injectable({
    providedIn: 'root'
  })
  export class EnvioDatosService {
    idCurso: any=0;
    fichaIncripcion: FichaInscripcion=new FichaInscripcion();
    valid:any;
    Cerrar:boolean=false;
    setIdCurso(id: any) {
      this.idCurso = id;
    }

    setficha(ficha:FichaInscripcion){
      this.fichaIncripcion=ficha;
    }

    setvalid(vali:any){
      this.valid=vali;
    }

    setCerrarsesion(opcion:any){
      this.Cerrar=opcion;
    }
  }