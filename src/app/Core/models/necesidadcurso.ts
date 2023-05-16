// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long ncuId;

import { Curso } from "./curso";
import { Dias } from "./dias";
import { Modalidadcurso } from "./modalidadcurso";
import { TiposCurso } from "./tiposcurso";

// @Column(name = "ncuFechaprevisfin", nullable = false)
// private Date ncuFechaprevisfin;

// @Column(name = "ncuNumparticipantes", nullable = false)
// private Integer ncuNumparticipantes;

// @Column(name = "ncuResumenyproyecto", nullable = false)
// private String ncuResumenyproyecto;

// @Column(name = "ncuPoblaciondirigida", nullable = false)
// private String ncuPoblaciondirigida;

// @Column(name = "ncuLugardicta", nullable = false)
// private String ncuLugardicta;

// @Column(name = "ncuEstado", nullable = false)
// private Boolean ncuEstado;

// @ManyToOne
// @JoinColumn(name="diaId",referencedColumnName ="diaId")
// private Dia dia;

// @JsonIgnore
// @OneToMany (mappedBy = "necesidadCurso")
// private List<Curso> cursos;

export class NecesidadCurso {
   
    
    ncuId: number =0;
    ncuFechaprevisfin: Date = new Date();
    ncuNumparticipantes?: number;
    ncuIdentificador:string='';
    ncuResumenyproyecto?: string;
    ncuPoblaciondirigida?: string;
    ncuLugardicta?: string;
    ncuEstado?: boolean;

    
    
    dia: Dias = new Dias;
   
    
  

   
    
  }