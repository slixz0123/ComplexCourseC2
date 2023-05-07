// private Long ccuId;

import { Datossilabo } from "./datossilabo";

//     @Column(name = "ccuDia", nullable = false)
//     private Integer ccuDia;

//     @Column(name = "ccuContenidos", nullable = false)
//     private String ccuContenidos;

//     @Column(name = "ccuHorasclase", nullable = false)
//     private Integer ccuHorasclase;

//     @Column(name = "ccuActividaddocencia", nullable = false)
//     private String ccuActividaddocencia;

//     @Column(name = "ccuHoraspractica", nullable = false)
//     private Integer ccuHoraspractica;

//     @Column(name = "ccuActividadpractica", nullable = false)
//     private String ccuActividadpractica;

//     @Column(name = "ccuHorastrabajoauto", nullable = false)
//     private Integer ccuHorastrabajoauto;

//     @Column(name = "ccuActividadtrabajoauto", nullable = false)
//     private String ccuActividadtrabajoauto;

//     @Column(name = "ccuObservaciones", nullable = false)
//     private String ccuObservaciones;

//     @Column(name = "ccuEstado", nullable = false)
//     private Boolean ccuEstado;

export class ContenidosCurso { 
    ccuId: number =0;
    ccuDia: number =0;
    ccuContenidos?: String;
    ccuHorasclase?: number;
    ccuActividaddocencia?: String;
    ccuHoraspractica?: number;
    ccuActividadpractica?: String;
    ccuHorastrabajoauto?: number;
    ccuActividadtrabajoauto?: String;
    ccuObservaciones?: String;
    ccuEstado?: boolean;

    ccuSilabo: Datossilabo = new Datossilabo; //id_persona herencia
  }