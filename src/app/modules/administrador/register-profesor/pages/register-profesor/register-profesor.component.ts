import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { Rol } from 'src/app/Core/models/rol';
import { Usuario } from 'src/app/Core/models/usuario';

import { claseValidaciones } from 'src/app/modules/utils/claseValidaciones';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import { RolService } from 'src/app/shared/Services/rol.service';
import { UsuarioService } from 'src/app/shared/Services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-profesor',
  templateUrl: './register-profesor.component.html',
  styleUrls: ['./register-profesor.component.css']
})
export class RegisterProfesorComponent{
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario(); // instancia de la clase usuario  
  usuarios: Usuario[] = [];
  rol: Rol = new Rol;// instancia de la clase rol
  cedula: string ='';
  nombreDeUsuario: string='';
  formularioValido: boolean| undefined;

  

  // en el constructor instanciamos los servicios
  constructor(private persoUsrService: PersonaService, private userServiceService: UsuarioService, private rolservices:RolService) { }
 validardatos: any;

 buscarRol(nombre: string){
    nombre="Docente";
    this.rolservices.getByRolNombre(nombre).subscribe((data: any)=>{
      if(null!= data){
        console.log(data);
        this.usuario.rol2=data;
      }
    })
 }
  buscarPersona(cedula: string) {
    
    this.persoUsrService.buscarPorCedula(cedula).subscribe((data : any) => {
      if (null != data) {
        this.persona = data;
        this.validardatos=1;
      } else {
        this.validardatos=2;
        alert("No se encontró la persona con el cedula proporcionado.");
        this.persona.id_persona;
        this.persona.cedula=cedula;
        this.persona.nombre = "string";
        this.persona.apellido = "string";
        this.persona.fecha_nacimiento = new Date('2000-01-01');
        this.persona.email = "string";
        this.persona.direccion = "string";
        this.persona.sexo = "string";
        this.persona.telefono = "registrar";
        this.persona.celular = "string";
        this.persona.etnia = "string";
        this.persona.nivelintruccion = "string";
        this.persona.hojavida = "string";


        alert("la persona es "+this.persona.nombre)

      }
    });
  }

  // crearRol():Rol{
  //   this.rol.id_rol=1;
  //   this.rol.rolNombre="Docente";
  //   this.rol.descripcion="Docente";
  //   this.rol.enabled=true;
  //   return this.rol;
  // }

  ngOnInit() {
    this.getAreas();
  }

  getAreas(): void {
    this.userServiceService.getDocentes().subscribe((response: Usuario[])=>{
      
      console.log(this.usuarios=response)
    })
  }

idPersona:any;
  onSubmit() {
  if (this.validardatos=1){
      this.idPersona=this.persona.id_persona
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 

      this.rolservices.getById(2).subscribe((response:any) => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
        this.usuario.rol =response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol
      });
      this.usuario.persona.id_persona=this.idPersona;
        this.usuario.rol.id_rol=2;
        this.usuario.enabled=true;

        console.log("Este es mi usuario")
        console.log(this.persona);
        this.userServiceService.postUsuario(this.usuario).subscribe((response: any) => {
          console.log(response); // Imprime la respuesta de la API en la consola
        

      });
  }else{
    this.persoUsrService.postPersona(this.persona).subscribe((response:Persona) => {
      console.log(response); // Imprime la respuesta de la API en la consola
      this.persona.id_persona = response.id_persona; // a this.persona.id_persona el resultado de nuestro metodo post se aasignamos la data.id_persona que nos arroja la api
      this.usuario.persona = this.persona;// a  this.usuario.persona el resultado de nuestro metodo post se  asigna el  this.persona es decir el objeto 


      this.rolservices.getById(2).subscribe((response:any) => {
        console.log(response); // Imprime la respuesta de la API en la consola
        this.rol.id_rol = response.id_rol; // se asigna   a this.rol.rolId  la data arrojada por el metodo del servicio get asignandole  response.rolId;
        this.usuario.rol =response; // se accede a la relacion del rol en la clase usuario y se asigna la data encontrada del rol

        this.userServiceService.postUsuario(this.usuario).subscribe((response: any) => {
          console.log(response); // Imprime la respuesta de la API en la consola
        });
      
      });
     });
    }
  }

  eliminar(espId: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este horario curso?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServiceService.deleteUsuario(espId).subscribe(() => {
          this.getAreas();
        });
      }
    });
  }

  filtro = '';

  actualizarFiltro() {
    this.filtro = (document.getElementById('buscar') as HTMLInputElement).value.trim();
  }
}




  /////validar si la cédula es correcta de acuerdo a los parámetros     
  // const validar=new claseValidaciones();
  // if (this.persona.cedula !== undefined){
  //   console.log(this.persona)
  //   if(this.persona.cedula.length===10){
  //     const esValida = validar.validarCedula(this.persona.cedula);
  //     if(esValida){
  //       alert('Lacédula es correcta');
  //     }else{
  //       alert('La cédula ingresada es incorrecta');
  //     }
  //   }else{
  //     alert('La cédula debe contener exactamente 10 caracteres numéricos')
  //   }
  // }else{
  //   Error('La cédula no se encuentra en la base de datos')
  // }

  // if(this.usuario.username!== null){
  //   const validaruser=validar.validarLetrasNumeros(this.usuario.username);
  //     if(validaruser){


  //     }
  //   }
