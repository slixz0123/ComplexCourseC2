// private static final long serialVersionUID = 1L;
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long diaId;

// @Column(name = "diaNombre", nullable = false)
// private String diaNombre;

// @Column(name = "diaEstado", nullable = false)
// private Boolean diaEstado;

// @JsonIgnore
// @OneToMany (mappedBy = "dia")
// private List<NecesidadCurso> necesidadCursos;

export class Dias {
   
    
    diaId: number = 0;
    diaNombre?: string;
    diaEstado?:boolean;
   
    
  }