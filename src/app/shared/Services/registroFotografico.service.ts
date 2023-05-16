import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroFotografico } from 'src/app/Core/models/registrFotografico';

@Injectable({
  providedIn: 'root'
})
export class RegistroFotograficoService {

  private apiUrl = 'http://localhost:8080/api/registrofotografico';

  constructor(private http: HttpClient) { }

  listar(): Observable<RegistroFotografico[]> {
    return this.http.get<RegistroFotografico[]>(`${this.apiUrl}/listar`);
  }

  buscar(id: number): Observable<RegistroFotografico> {
    return this.http.get<RegistroFotografico>(`${this.apiUrl}/buscar/${id}`);
  }

  crear(registro: RegistroFotografico): Observable<RegistroFotografico> {
    return this.http.post<RegistroFotografico>(`${this.apiUrl}/crear`, registro);
  }

  eliminar(id: number, registro: RegistroFotografico): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminar/${id}`, registro);
  }

  actualizar(id: number, registro: RegistroFotografico): Observable<RegistroFotografico> {
    return this.http.put<RegistroFotografico>(`${this.apiUrl}/actualizar/${id}`, registro);
  }
}
