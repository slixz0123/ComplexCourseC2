// private static final long serialVersionUID = 1L;
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long emeId;

import { Datossilabo } from "./datossilabo";

// @Column(name = "emeEstrategia", nullable = false)
// private String emeEstrategia;

// @Column(name = "emeFinalidad", nullable = false)
// private String emeFinalidad;

// @Column(name = "emeEstado", nullable = false)
// private Boolean emeEstado;

export class EstrategiasMetodologicas { 
    emeId: number =0;
    emeEstrategia?: String;
    emeFinalidad?: String;
    emeEstado?: boolean;

    ccuSilabo: Datossilabo = new Datossilabo;
  }