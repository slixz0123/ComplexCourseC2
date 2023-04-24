import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarjsHomeService {

  constructor() { }
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
  //   src/assets/vendor2
  carga_jquery(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  //
  carga_custom(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  carga_boost(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }

  
}
