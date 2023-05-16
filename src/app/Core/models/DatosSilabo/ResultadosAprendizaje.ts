
// private Long rapId;

import { Datossilabo } from "./datossilabo";

//     @Column(name = "rapUnidadcompe", nullable = false)
//     private String rapUnidadcompe;

//     @Column(name = "rapElementoscompe", nullable = false)
//     private String rapElementoscompe;

//     @Column(name = "rapResultadosaprenactiv", nullable = false)
//     private String rapResultadosaprenactiv;

//     @Column(name = "rapFormaevidenciar", nullable = false)
//     private String rapFormaevidenciar;

//     @Column(name = "rapEstado", nullable = false)
//     private Boolean rapEstado;

export class ResultadosAprendizaje { 
    rapId: number =0;
    rapUnidadcompe: String ="";
    rapResultadosaprenactiv: String="";
    rapFormaevidenciar: String="";
    rapElementoscompe:String="";
    rapEstado?: boolean;

    rapSilabo: Datossilabo = new Datossilabo;
  }