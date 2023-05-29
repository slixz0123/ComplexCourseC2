import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/Core/models/curso';
import { EntregaCertificado } from 'src/app/Core/models/entregaCertificados';

@Injectable({
  providedIn: 'root'
})

export class EntregaCertificadoService {
  private host = "165.22.182.237"
  private URL = "http://" + this.host + ":8080/api/EntregaCertificado"
  private URLReporte = "http://" + this.host + ":8080/api/reporteCertificado";
  private URLReporte2 = "http://" + this.host + ":8080/api/reporteEntregaCertificado";

  constructor(private http: HttpClient) { }

  public getAllCertificados() {
    return this.http.get<any>(`${this.URL}/listar`);
  }

  public getCertificadosById(idCertificado: any) {
    return this.http.get<EntregaCertificado>(`${this.URL}/buscar/`, idCertificado);
  }

  public printCertificado(certicado: EntregaCertificado) {
    return this.http.post(`${this.URLReporte}/generarReporte`, certicado, {
      responseType: 'blob'
    });
  }

  public printListaCertificados(listCerticados: EntregaCertificado[]) {
    return this.http.post(`${this.URLReporte2}/generarReporte/`, listCerticados, {
      responseType: 'blob'
    });
  }

  public getCertificadosByIdParticipante(parId: any) {
    return this.http.get<EntregaCertificado>(`${this.URL}/getByParticipanteId/`+ parId);
  }
  public getCertificadosByCurso(curId: any) {
    return this.http.get<EntregaCertificado>(`${this.URL}/getByCursoId/`+ curId);
  }

}







