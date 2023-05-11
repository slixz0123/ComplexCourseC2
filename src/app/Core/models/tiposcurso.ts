export class TiposCurso {
   
    
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long tcuId;
    // @Column(name = "tcuNombre", length = 30, nullable = false, unique = true)
    // private String tcuNombre;
    // @Column(name = "tcuEstado", length = 30, nullable = false)
    // private Boolean tcuEstado;

    
    tcuId?: number;
    tcuNombre?: string;
    tcuEstado?:boolean;
    
  }