import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class EnvioDatosService {
    idCurso: any;

    setIdCurso(id: any) {
      this.idCurso = id;
    }
  }