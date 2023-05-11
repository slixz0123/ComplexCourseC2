// @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long curId;

import { Modalidadcurso } from "./modalidadcurso";
import { TiposCurso } from "./tiposcurso";
import { ProgramaCapacitacion } from "./programa-capacitacion";

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
   
    
    curId?: number;
    curCodigo?: String;
    curNombre?: string;
    curFechainicio?: Date;
    curFechafin?: Date;
    curNumhoras?: number;
    curProceso?: string;
    curEstado?: boolean;
    programaCapacitacion?:ProgramaCapacitacion;

    tcursos: TiposCurso = new TiposCurso; //id_persona herencia
    mcursos: Modalidadcurso = new Modalidadcurso; //id_persona herencia

   
   
    
  }