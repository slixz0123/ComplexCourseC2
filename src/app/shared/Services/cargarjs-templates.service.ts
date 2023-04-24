import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarjsTemplatesService {

  constructor() { }
  // <script src="src/assets/vendor/apexcharts/apexcharts.min.js"></script>
  // <script src="src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  // <script src="src/assets/vendor/chart.js/chart.umd.js"></script>
  // <script src="src/assets/vendor/echarts/echarts.min.js"></script>
  // <script src="src/assets/vendor/quill/quill.min.js"></script>
  // <script src="src/assets/vendor/simple-datatables/simple-datatables.js"></script>
  // <script src="src/assets/vendor/tinymce/tinymce.min.js"></script>
  // <script src="src/assets/vendor/php-email-form/validate.js"></script>
  carga_apexcharts(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/apexcharts/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  //
  carga_boostrap(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/bootstrap/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
   //
   carga_mainjs(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }

  carga_echarts(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/echarts/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  carga_quill(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/quill/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }

  carga_simpledatatables(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/simple-datatables/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  //tinymce

  carga_tinymce(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/tinymce/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }

   ///assets/vendor/php-email-form/
   carga_phpemailform(archivos: string[]) {
    
    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/vendor/php-email-form/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  carga3(archivos: string[]) {

    for (let archivo of archivos) {
      let script = document.createElement("script");

      script.src = "./assets/js/" + archivo + ".js"
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  
}
