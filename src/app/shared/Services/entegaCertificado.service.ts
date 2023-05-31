import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EntregaCertificado } from 'src/app/Core/models/entregaCertificado';
import { UrlApi } from 'src/app/Core/models/url';

@Injectable({
  providedIn: 'root'
})
export class EntregaCertificadoService {

  private URL = UrlApi+"/api/EntregaCertificado";

  constructor(private http: HttpClient) {
   
  }

  obtenerLista(): Observable<EntregaCertificado[]> {
    return this.http.get<EntregaCertificado[]>(`${this.URL}/listar`);
  }

  getById(id: number): Observable<EntregaCertificado> {
    return this.http.get<EntregaCertificado>(`${this.URL}/buscar/${id}`);
  }

  crear(entregaCertificado: EntregaCertificado): Observable<EntregaCertificado> {
    return this.http.post<EntregaCertificado>(`${this.URL}/crear`, entregaCertificado);
  }

  eliminar(id: number): Observable<any> {
    const url = `${this.URL}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          // console.error(error);
          return throwError('Error eliminando el certificado');
        })
      );
  }

  actualizarEntregaCertificado(entregaCertificado: EntregaCertificado, eceId: any){
    return this.http.put<EntregaCertificado>(`${this.URL}/actualizar/${eceId}`, entregaCertificado);
  }

  obtenerCertificadosPorParticipante(parId: number): Observable<EntregaCertificado[]> {
    const url = `${this.URL}/listarcertificados/${parId}`;
    return this.http.get<EntregaCertificado[]>(url);
  }
}
