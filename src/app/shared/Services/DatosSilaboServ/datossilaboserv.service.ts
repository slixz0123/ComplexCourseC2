import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultadosAprendizaje } from 'src/app/Core/models/DatosSilabo/resultadosAprendizaje';
import { Datossilabo } from 'src/app/Core/models/DatosSilabo/datosSilabo';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/Core/models/curso';
import { HorarioCurso } from 'src/app/Core/models/horarioCurso';
import { HorasAprendizaje } from 'src/app/Core/models/DatosSilabo/horasAprendizaje';
import { ContenidosCurso } from 'src/app/Core/models/DatosSilabo/contenidosCurso';
import { EstrategiasMetodologicas } from 'src/app/Core/models/DatosSilabo/estrategiasMetodologicas';
import { RecursosDidacticos } from 'src/app/Core/models/DatosSilabo/recursosDidacticos';
import { EvaluacionEpra } from 'src/app/Core/models/DatosSilabo/evaluacionepra';

@Injectable({
  providedIn: 'root'
})
export class DatossilaboservService {
  private host = "localhost"
  private URL = "http://"+ this.host +":8080/api/DatosSilabo/buscar/";
  private URL1 = "http://"+ this.host +":8080/api/DatosSilabo/";
  private URL2 = "http://"+ this.host +":8080/api/DatosSilabo/crear";
  private URLReporte = "http://"+ this.host +":8080/api/reporteSilabo";
  private items: ResultadosAprendizaje[] = [];

  constructor(private http: HttpClient) { }


// utilizados
getItems(): ResultadosAprendizaje[] {
  return this.items;
}
addItem(product: ResultadosAprendizaje, ): void {
  this.items.push(product);
}

removeItem(product: ResultadosAprendizaje): void {
  const index = this.items.indexOf(product);
  if (index !== -1) {
    this.items.splice(index, 1);
  }
}
post(Datossilabo: Datossilabo) {
  return this.http.post<Datossilabo>(this.URL2 + '?', Datossilabo);
}
getById(Datossilabo: number) {
  return this.http.get<Datossilabo>(this.URL + Datossilabo);
}
getAll() {
  return this.http.get<Datossilabo[]>(this.URL1 + 'listar')
}
delete(dtssilab: Datossilabo, iddts: number) {
  return this.http.put<Datossilabo>(this.URL1+ `eliminar/${iddts}`, dtssilab);
}
update(dtssilab: Datossilabo, iddts: number) {
  return this.http.put<Datossilabo>(this.URL1+ `actualizar/${iddts}`, dtssilab);
}
getPorId(iddtssil: any) {
  return this.http.get<Datossilabo>(this.URL + iddtssil);
}
public printSilabo(curso: Curso, horarioCurso:HorarioCurso[],
  horasAprendizaje: HorasAprendizaje[], resultadoAprendizaje: ResultadosAprendizaje[],
  contenidoCurso: ContenidosCurso[], estrategiaMetodologica: EstrategiasMetodologicas[],
  recursoDidactico: RecursosDidacticos[], evaluacionEpra: EvaluacionEpra[]): Observable<any> {
  const requestData = {
    curso: curso,
    horarioCursos: horarioCurso,
    horasAprendizaje: horasAprendizaje,
    resultadosAprendizaje: resultadoAprendizaje,
    contenidosCursos: contenidoCurso,
    estrategiasMetodologicas: estrategiaMetodologica,
    recursoDidactico: recursoDidactico,
    evaluacionEpra: evaluacionEpra
  };
  return this.http.post(`${this.URLReporte}/imprimirSilabo`, requestData, {
    responseType: 'blob'
  });
}

}
