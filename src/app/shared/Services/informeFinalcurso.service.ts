import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformeFinal } from 'src/app/Core/models/informeFinal';

@Injectable({
  providedIn: 'root'
})
export class InformeFinalService {

  private URL = "http://localhost:8080/api/informefinal";

  constructor(private http: HttpClient) { }

  public saveInformefinal(informefinal: InformeFinal) {
    return this.http.post<InformeFinal>(`${this.URL}/crear`, informefinal);
  }

  public getAllInformefinal() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getInformefinalById(idInformefinal: any) {
    return this.http.get<InformeFinal>(`${this.URL}/buscar/`, idInformefinal);
  }

  public updateInformefinalCurso(idInformefinal: any, informefinal: InformeFinal) {
    return this.http.put<InformeFinal>(`${this.URL}/Actualizar/` + idInformefinal, informefinal);
  }


}

