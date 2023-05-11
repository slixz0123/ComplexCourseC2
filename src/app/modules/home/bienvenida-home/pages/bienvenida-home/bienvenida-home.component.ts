import { Component, OnInit } from '@angular/core';
import { CargarjsHomeService } from '../../../services/cargarjs-home.service';
import { Router } from '@angular/router';
import {ProgramaCapacitacion} from 'src/app/Core/models/programa-capacitacion'
import {ProgramaCapacitacionService} from 'src/app/shared/Services/programa-capacitacion.service'

@Component({
  selector: 'app-bienvenida-home',
  templateUrl: './bienvenida-home.component.html',
  styleUrls: ['./bienvenida-home.component.css']
})
export class BienvenidaHomeComponent implements OnInit{
  programas: ProgramaCapacitacion[] = [];
    // <!-- Vendor JS Files -->
  // <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  // <script src="assets/vendor/aos/aos.js"></script>
  // <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  // <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  // <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  // <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  // <script src="assets/vendor/php-email-form/validate.js"></script>

  // <!-- Template Main JS File -->
  // <script src="assets/js/main.js"></script>
  //   <script src="js/custom.js"></script>
  //   <script src="js/bootstrap.js"></script>
  
  constructor(
    private _CargarSc: CargarjsHomeService, private router : Router, private programaCapacitacionService: ProgramaCapacitacionService)
  {
      
      _CargarSc.carga_boost(["bootstrap"])
    
  }

  ngOnInit(): void {
    this.getProgramasCapacitacion();
  }

  getProgramasCapacitacion(): void {
    this.programaCapacitacionService.getProgramasCapacitacion().subscribe((programas) => {
      this.programas = programas;
    });
  }
//////////////////////////////////////////////////////
goToRegister($event: any) :void{

    this.router.navigate(['/register-usr'])
    console.log($event)
   }

   goTologin($event: any) :void{

    this.router.navigate(['/Auth'])
    console.log($event)
   }


}
