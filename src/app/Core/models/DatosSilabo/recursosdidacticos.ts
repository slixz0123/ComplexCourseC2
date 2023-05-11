// private Long rdiId;

import { Datossilabo } from "./datossilabo";

//     @Column(name = "rdiMateconvencional", nullable = false)
//     private String rdiMateconvencional;

//     @Column(name = "rdiMateaudiovisula", nullable = false)
//     private String rdiMateaudiovisula;

//     @Column(name = "rdiEstado", nullable = false)
//     private Boolean rdiEstado;

export class RecursosDidacticos { 
    rdiId: number =0;
    rdiMateconvencional?: String;
    rdiMateaudiovisula?: String;
    rdiEstado?: boolean;

    rdiSilabo: Datossilabo = new Datossilabo;
  }