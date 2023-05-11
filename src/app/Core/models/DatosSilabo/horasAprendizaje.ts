import { Datossilabo } from "./datossilabo";

// private Long hapId;

// @Column(name = "hapDocencia", nullable = false)
// private Integer hapDocencia;

// @Column(name = "hapPracticas", nullable = false)
// private Integer hapPracticas;

// @Column(name = "hapTrabajoAutonomo", nullable = false)
// private Integer hapTrabajoAutonomo;

// @Column(name = "hapEstado", nullable = false)
// private Boolean hapEstado;
export class HorasAprendizaje { 
  hapId: number =0;
  hapDocencia?: number;
  hapPracticas?: number;
  hapTrabajoAutonomo?: number;
  hapEstado?: boolean;

  hapSilabo: Datossilabo = new Datossilabo;
  }