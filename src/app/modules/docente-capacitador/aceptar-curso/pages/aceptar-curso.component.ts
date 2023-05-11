import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/Core/models/cursos';
import { FichaInscripcion } from 'src/app/Core/models/ficha Inscripcion';
import { Participante } from 'src/app/Core/models/participante';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';
import { CursoService } from 'src/app/shared/Services/curso.service';
import { FichaIncripcionServ } from 'src/app/shared/Services/fichaInscripcion-serv.service';
import { participanteService } from 'src/app/shared/Services/participante-serv.service';
import { PersonaServService } from 'src/app/shared/Services/persona-serv.service';
import { RolServService } from 'src/app/shared/Services/rol-serv.service';
import { UsuarioServService } from 'src/app/shared/Services/usuario-serv.service';

@Component({
  selector: 'app-aceptar-curso',
  templateUrl: './aceptar-curso.component.html',
  styleUrls: ['./aceptar-curso.component.css']
})
export class AceptarCursoComponent implements OnInit{
  mostrarFormulario = false;

  constructor(private personService:PersonaServService, 
    private rolService:RolServService, 
    private usuarioService:UsuarioServService,
    private cursoService:CursoService,
    private participanteService:participanteService,
    private fichaService:FichaIncripcionServ){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  persona: Persona= new Persona();
  rol: Rol= new Rol();
  personas: Persona[] = [];
  cursos: Cursos[] | undefined;
  curso: Cursos= new Cursos();
  usuario: Usuario = new Usuario(); 
  ficha: FichaInscripcion=new FichaInscripcion();
  fichas:FichaInscripcion[]=[];


  nombre: string = '';
  cedula: string='';
  formularioValido: boolean| undefined;



  crearUsuario(){
    if(this.persona.nombre !== undefined){
      console.log("hola")
      const usuario: Usuario = {
        username: this.persona?.nombre + this.persona?.apellido,
        password: "123456",
        persona: this.persona,
        rol: this.rol,
        enabled: true // Establece la propiedad enabled como true
        
      };
      
      this.usuarioService.crearUsuario(usuario).subscribe((data: any) => {
        console.log(data);
        console.log("Entra")
      });
    }else{
      console.log("no hay data")
    }
    
  }
  onSubmitGuardar() {
  //     this.rolService.getById(1).subscribe((response) => {
  //       console.log(response); // Imprime la respuesta de la API en la consola
  //       this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
  //       this.usuario.rol = response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol

  //       this.usuarioService
  //         .crearUsuario(this.usuario)
  //         .subscribe((response) => {
  //           console.log(response); // Imprime la respuesta de la API en la consola
  //           // Llama a la función resetForm() para vaciar los campos del formulario
  //         });
  //     });
  // }

  // onSearchInputChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const searchTerm = inputElement.value;
  //   this.buscar(searchTerm);
  // }

  // buscar(valor: string) {
  //   const filas = document.getElementsByTagName("tr");
  //   for (let i = 0; i < filas.length; i++) {
  //     const celdas = filas[i].getElementsByTagName("td");
  //     for (let j = 0; j < celdas.length; j++) {
  //       if (celdas[j].innerHTML.toUpperCase().indexOf(valor.toUpperCase()) > -1) {
  //         filas[i].style.display = "";
  //         break;
  //       } else {
  //         filas[i].style.display = "none";
  //       }
  //     }
  //   }
    this.listarPersona(this.cedula);
  }

  listarPersona(cedula: string){
    this.personService.buscarPorCedula(cedula).subscribe((data : any)=>{
      if(null !== data){
        this.persona=data;
        console.log(this.persona);
        this.listarRol();
      }else{
        console.log("no hay data")
      }
    });
    
  };

  crearParti(){
    console.log("almenos entra");
    console.warn(this.ficha.finPersona);
    console.warn(this.ficha.finCurso)
    const participante: Participante = {
      parId: 2,
      parNotaparcial: 0.0,
      parNotafinal: 0.0,
      parPromedio: 0.0,
      parObservacion: 'Aprobado',
      parEstadoaprovacion: 'Aprobado',
      parEstado: true,
      curso: this.ficha.finCurso,
      parPersona: this.ficha.finPersona // Opcionalmente, puedes agregar una persona si la tienes disponible
     };
    this.participanteService.saveFichaIncripcion(participante).subscribe((response: Participante) => {
      console.log('Participante creado: ', response);
    });

  }
 


  listarRol() : void{
    this.rolService.buscarNombre("Participante").subscribe((data: any)=>{
      if(null != data){
        this.rol=data;
        console.log(this.rol);

        this.usuario.persona=this.persona;
        this.usuario.rol=this.rol;

        // this.usuarioService.postUsuario(this.usuario).subscribe((Response)=>{
        //   console.log(Response);
        // })
      }else{
        console.log("no hay data");
      }
    });
  }

  listarCurso(){
    this.cursoService.getAll().subscribe((Response: Cursos[])=>{
      this.cursos = Response;
      console.log(Response);
    })
  }

  listarFichas(){
    this.fichaService.getAllFichaIncripcion().subscribe((Response: FichaInscripcion[])=>{
      this.fichas=Response;
      console.log(Response);
    })
  }
  seleccionarPesona(persona: any) {
    this.persona = Object.assign({}, persona); // crea una copia del objeto para evitar cambios no deseados
    this.formularioValido=true;
  }
  seleccionarCurso(curso: any) {
    this.curso = Object.assign({}, curso); // crea una copia del objeto para evitar cambios no deseados
    this.formularioValido=true;
  }

  seleccionarFicha(ficha:any){
    this.ficha=Object.assign({}, ficha);
    this.formularioValido=true;
    console.log(ficha)
  }
}
