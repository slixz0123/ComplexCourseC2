import { Especialidad } from "./especialidad";
import { MecanismoEvaluacion } from "./mecanismoevaluacion";

export class DisenoCurricular {

  dcuId: number = 0;
  dcuNiveles: string = '';
  dcuTemastransversales: string = '';
  dcuEstado: boolean = true;
  //cursos: Curso[];
  //entornoAprendizajes: EntornoAprendizaje[];
  mecanismoEvaluaciones?: MecanismoEvaluacion[]; // Uncomment if needed

    
  }