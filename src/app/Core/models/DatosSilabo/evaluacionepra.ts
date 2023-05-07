// private Long eraId;

import { Datossilabo } from "./datossilabo";

// @Column(name = "eraTipoactividades", nullable = false)
// private String eraTipoactividades;

// @Column(name = "eraCantactvidades", nullable = false)
// private Integer eraCantactvidades;

// @Column(name = "eraPorcentcalificacion", nullable = false)
// private Integer eraPorcentcalificacion;

// @Column(name = "eraTotal", nullable = false)
// private Integer eraTotal;

// @Column(name = "eraEstado", nullable = false)
// private Boolean eraEstado;

export class EvaluacionEpra { 
    eraId: number =0;
    eraTipoactividades?: String;
    eraCantactvidades?: number;
    eraPorcentcalificacion?: number;
    eraTotal?: number;
    eraEstado?: boolean;
    
    ccuSilabo: Datossilabo = new Datossilabo;
  }