import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EntregaCertificado } from 'src/app/Core/models/entregaCertificado';

@Injectable({
  providedIn: 'root'
})
export class EntregaCertificadoService {
<<<<<<< Updated upstream
  private baseUrl: string;
=======

  private host = "165.22.182.237"
  private URL = "http://"+ this.host +":8080/api/EntregaCertificado";
>>>>>>> Stashed changes

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/EntregaCertificado';
  }

  obtenerLista(): Observable<EntregaCertificado[]> {
    return this.http.get<EntregaCertificado[]>(`${this.baseUrl}/listar`);
  }

  getById(id: number): Observable<EntregaCertificado> {
    return this.http.get<EntregaCertificado>(`${this.baseUrl}/buscar/${id}`);
  }

  crear(entregaCertificado: EntregaCertificado): Observable<EntregaCertificado> {
    return this.http.post<EntregaCertificado>(`${this.baseUrl}/crear`, entregaCertificado);
  }

  eliminar(id: number): Observable<any> {
    const url = `${this.baseUrl}/eliminar/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(url, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return throwError('Error eliminando el certificado');
        })
      );
  }

  actualizarEntregaCertificado(entregaCertificado: EntregaCertificado, eceId: any){
    return this.http.put<EntregaCertificado>(`${this.baseUrl}/actualizar/${eceId}`, entregaCertificado);
  }

  obtenerCertificadosPorParticipante(parId: number): Observable<EntregaCertificado[]> {
    const url = `${this.baseUrl}/listarcertificados/${parId}`;
    return this.http.get<EntregaCertificado[]>(url);
  }
}
