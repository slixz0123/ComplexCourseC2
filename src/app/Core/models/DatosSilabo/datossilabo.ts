// private Long dsiId;

//     @Column(name = "dsiPrerrequisitos", nullable = false)
//     private String dsiPrerrequisitos;

//     @Column(name = "dsiDescripcioncurso", nullable = false)
//     private String dsiDescripcioncurso;

//     @Column(name = "dsiObjetivogeneralc", nullable = false)
//     private String dsiObjetivogeneralc;

//     @Column(name = "dsiBibliografia", nullable = false)
//     private String dsiBibliografia;

//     @Column(name = "dsiEstado", nullable = false)
//     private Boolean dsiEstado;

export class Datossilabo { 
    dsiId: number =0;
    dsiPrerrequisitos: String="";
    dsiDescripcioncurso: String="";
    dsiObjetivogeneralc: String="";
    dsiBibliografia: String="";
    dsiIdentificador:string="";
    dsiEstado: boolean=true;
    

    
  }