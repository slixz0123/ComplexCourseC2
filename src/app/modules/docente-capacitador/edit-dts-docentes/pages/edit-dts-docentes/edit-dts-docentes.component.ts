import { Component } from '@angular/core';
import { Persona } from 'src/app/Core/models/persona';
import { PersonaService } from 'src/app/shared/Services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dts-docentes',
  templateUrl: './edit-dts-docentes.component.html',
  styleUrls: ['./edit-dts-docentes.component.css']
})
export class EditDtsDocentesComponent {
  persona: Persona = new Persona; // instancia de la clase persona 
  personai: Persona = new Persona; // instancia de la clase persona 
  id_persona: any;
  constructor(
    private personaService: PersonaService
  ) { }
  ngOnInit(): void {
    //id de persona inicializada
    this.id_persona = localStorage.getItem('id_persona');
    this.mostrarDatos();
  }

  //filtra los numeros para dar formato de telefono
  filtrarNumeros(event: any) {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
    // Verificar si la longitud del número después de filtrar es mayor a 9
    if (numericInput.length > 9) {
      // Obtener solo los primeros 9 dígitos del número
      const formattedInput = numericInput.substr(0, 9);
      // Aplicar el formato deseado al número telefónico
      const formattedNumber = `(${formattedInput.substr(0, 2)})${formattedInput.substr(2, 3)}-${formattedInput.substr(5, 4)}`;
      event.target.value = formattedNumber;
    } else {
      // Aplicar el formato solo si hay algún número ingresado
      if (numericInput.length > 0) {
        const formattedNumber = `(${numericInput.substr(0, 2)})${numericInput.substr(2, 3)}-${numericInput.substr(5, 4)}`;
        event.target.value = formattedNumber;
      } else {
        event.target.value = '';
      }
    }
    // Actualizar el valor en la propiedad fichaInscripcion.finTelefonoinst
    this.persona.telefono = event.target.value;
  }
  //filtra los numeros para dar formato de celular
  filtrarNumerosc(event: any) {
    const input = event.target.value;
    const numericInput = input.replace(/[^0-9()]/g, ''); // Filtrar caracteres no numéricos ni paréntesis

    let areaCode = '';
    let phoneNumber = '';

    if (numericInput.length > 0) {
      // Obtener el área de código
      const areaCodeMatches = numericInput.match(/\(([0-9]{1,3})\)/);
      if (areaCodeMatches && areaCodeMatches.length > 1) {
        areaCode = areaCodeMatches[1].substr(0, 3);
      }

      // Obtener el número de teléfono
      const phoneNumberMatches = numericInput.match(/\)([0-9]{0,9})/);
      if (phoneNumberMatches && phoneNumberMatches.length > 1) {
        phoneNumber = phoneNumberMatches[1];
      }
    }

    let formattedNumber = `(${areaCode})${phoneNumber}`;
    event.target.value = formattedNumber;

    // Actualizar el valor en la propiedad persona.celular
    this.persona.celular = event.target.value;

  }
  //Variables de validacion
  valnombre: boolean = true;
  valapellido: boolean = true;
  valfechan: boolean | undefined;
  valemail: boolean = true;
  valdireccion: boolean = true;
  valtelefono: boolean = true;
  valcelular: boolean = true;
  valetnia: boolean = true;
  valsexo: boolean = true;
  valnivel: boolean = true;
  valhoja: boolean = true;

  validarcampos() {
    //Validar nombre, apellido y etnia
    const campo1Regex = /^(?=.*[A-Za-z])[A-Za-z\s\u00f1\u00d1áéíóúÁÉÍÓÚ]+$/u;

    this.valnombre = this.persona && typeof this.persona.nombre === 'string' && campo1Regex.test(this.persona.nombre);
    this.valapellido = this.persona && typeof this.persona.apellido === 'string' && campo1Regex.test(this.persona.apellido);
    // this.valetnia = this.persona && typeof this.persona.etnia === 'string' && campo1Regex.test(this.persona.etnia);
    //validar direccion
    const campo2Regex = /^(?=.*[A-Za-z])[0-9A-Za-z\s\u00f1\u00d1áéíóúÁÉÍÓÚ.-]+$/u;

    this.valdireccion = this.persona && typeof this.persona.direccion === 'string' && campo2Regex.test(this.persona.direccion);
    //Validar Correo
    const correoRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|tecazuay\.edu\.ec)$/;
    this.valemail = this.persona && typeof this.persona.email === 'string' && correoRegex.test(this.persona.email);
    //validar telefono
    const telefonoRegex = /^\((?!00)\d{2}\)(?!0{3}-0{4}$)\d{3}-\d{4}$/;
    this.valtelefono = this.persona && typeof this.persona.telefono === 'string' && telefonoRegex.test(this.persona.telefono);
    //validar celular
    const celularRegex = /^\((?!0{2,})[1-9]\d{0,3}\)(?!0{9})[0-9]{9}$/;
    this.valcelular = this.persona && typeof this.persona.celular === 'string' && celularRegex.test(this.persona.celular);
    //validar sexo
    if (this.persona.sexo === "Masculino" || this.persona.sexo === "Femenino" || this.persona.sexo === "Otro") {
      this.valsexo = true
    } else {
      this.valsexo = false
    }
    //validar nivel de instruccion
    if (this.persona.nivelintruccion === "Primaria" || this.persona.nivelintruccion === "Secundaria" ||
      this.persona.nivelintruccion === "Bachiller" || this.persona.nivelintruccion === "Tercer Nivel"
      || this.persona.nivelintruccion === "Cuarto Nivel") {
      this.valnivel = true
    } else {
      this.valnivel = false
    }
    //Validar etnia
    if (this.persona.etnia === "Mestizo" || this.persona.etnia === "Indígena" ||
      this.persona.etnia === "Blanco" || this.persona.etnia === "Afroecuatoriano"
      || this.persona.etnia === "Otro") {
      this.valetnia = true
    } else {
      this.valetnia = false
    }
    //validar que todas las validaciones se cumplan
    if (this.valnombre && this.valapellido && this.valetnia && this.valdireccion && this.valemail
      && this.valtelefono && this.valcelular && this.valnivel && this.valsexo && this.valfechan) {
      this.onSubmit();
    } else {
      Swal.fire('¡Error!', 'Ingrese los campos correctos.', 'error');
    }
  }

  compararEdad(): void {
    // Obtiene la fecha actual
    const fechaActual = new Date();
    // Obtiene la fecha seleccionada del formulario
    const fechaSeleccionada = this.persona.fecha_nacimiento ? new Date(this.persona.fecha_nacimiento) : undefined;
    // Verifica si la fecha seleccionada es válida
    if (fechaSeleccionada === undefined) {
      // No se seleccionó una fecha válida
    } else {
      fechaSeleccionada.setMinutes(fechaSeleccionada.getMinutes() + fechaSeleccionada.getTimezoneOffset());
      // Calcular la diferencia de edad en milisegundos
      const diferenciaTiempo = fechaActual.getTime() - fechaSeleccionada.getTime();
      // Calcular la edad en años
      const edadEnAnios = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24 * 365.25));
      this.valfechan = edadEnAnios >= 18;
    }
  }


  onSubmit() {
    //cambia a formato normal telefono
    if (this.persona.telefono) {
      const telefonoSinParentesis = this.persona.telefono.replace(/\(|\)|-/g, "");
      this.persona.telefono = telefonoSinParentesis;
    } else {
    }
    //cambia a formato normal celular
    if (this.persona.celular) {
      const celularSinParentesis = this.persona.celular.replace(/\(|\)/g, "");
      this.persona.celular = celularSinParentesis;
    } else {
    }
    this.id_persona = (this.persona.id_persona);
    this.persona.hojavida = "N/a"
    //pregunta de verificacion
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      text: '¿Desea editar su perfil?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Da formato a la fecha
        if (this.persona.fecha_nacimiento) {
          const fechaInicio = new Date(this.persona.fecha_nacimiento);
          const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate());
          this.persona.fecha_nacimiento = fechaInicioUTC;
        } else { }
        //Actualiza la persona
        this.personaService.updatePersona(this.persona, this.id_persona).subscribe(
          (data: any) => {
            Swal.fire('¡Éxito!', 'Su perfil se actualizó correctamente.', 'success');
            this.mostrarDatos();
          },
          (err) => {
            // console.log(err);
            Swal.fire('¡Error!', 'Ha ocurrido un error al editar su perfil. Por favor, inténtelo de nuevo más tarde.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Edición cancelada', 'No se ha realizado ninguna modificación', 'info');
        this.mostrarDatos();
      }
    });

  }
  //Muestra los datos de persona
  public mostrarDatos() {
    this.personaService.getPorId(this.id_persona).subscribe(
      (datai: any) => {
        this.persona = datai;
        this.darFormatoTelefono(datai.celular, datai.telefono)
      },
      (err) => {
        // console.log(err);
        Swal.fire('¡Error!', 'Ha ocurrido un error al mostrar los datos de su perfil. Por favor, inténtelo de nuevo más tarde.', 'error');
      }
    );
  }

  //Da formato al celular y telefono
  darFormatoTelefono(celular: string, telefono: string) {
    //formato celular
    const phoneNumber = celular.slice(-9); // Últimos 9 dígitos desde la derecha
    const areaCode = celular.slice(0, -9); // Resto de dígitos
    let culularFormateado = "";

    if (areaCode.length > 0) {
      culularFormateado = `(${areaCode})${phoneNumber}`;
    } else {
      culularFormateado = phoneNumber;
    }
    //carga
    this.persona.celular = culularFormateado;
    //formato telefono
    const phoneNumber2 = telefono.slice(-4); // Últimos 4 dígitos desde la derecha
    const middleDigits = telefono.slice(-7, -4); // 3 dígitos antepenúltimos
    const areaCode2 = telefono.slice(0, -7); // Resto de dígitos
    let telefonoFormateado = "";

    if (areaCode.length > 0) {
      telefonoFormateado = `(${areaCode2})${middleDigits}-${phoneNumber2}`;
    } else {
      telefonoFormateado = `${middleDigits}-${phoneNumber2}`;
    }
    //carga
    this.persona.telefono = telefonoFormateado;
  }



}
