// @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long curId;

import { Modalidadcurso } from "./modalidadcurso";
import { TiposCurso } from "./tiposcurso";
import { ProgramaCapacitacion } from "./programa-capacitacion";
import { Especialidad } from "./especialidad";
import { Datossilabo } from "./DatosSilabo/datossilabo";
import { NecesidadCurso } from "./necesidadcurso";
import { DisenoCurricular } from "./disenoCurricular";
import { Persona } from "./persona";

//     @Column(name = "curCodigo", nullable = false)
//     private String curCodigo;

//     @Column(name = "curNombre", nullable = false)
//     private String curNombre;

//     @Column(name = "curFechainicio", nullable = false)
//     private Date curFechainicio;

//     @Column(name = "curFechafin", nullable = false)
//     private Date curFechafin;

//     @Column(name = "curNumhoras", nullable = false)
//     private Integer curNumhoras;

//     @Column(name = "curProceso", nullable = false)
//     private String curProceso;

//     @Column(name = "curEstado", nullable = false)
//     private Boolean curEstado;
export class Curso {

  curId: number = 0 ;
  curCodigo: String = '';
  curNombre: string = '';
  curFechainicio: Date = new Date();
  curFechafin: Date = new Date();
  curNumHoras: number = 0;
  curProceso: string = '';
  curEstado: boolean = true;

  programaCapacitacion: ProgramaCapacitacion = new ProgramaCapacitacion;
  ecursos: Especialidad = new Especialidad;
  mcursos: Modalidadcurso = new Modalidadcurso;
  tipoCurso: TiposCurso = new TiposCurso;
  datosSilabo: Datossilabo = new Datossilabo;
  necesidadCurso: NecesidadCurso = new NecesidadCurso;
  disenoCurricular: DisenoCurricular  = new DisenoCurricular;
  pcursos: Persona = new Persona;
  
}