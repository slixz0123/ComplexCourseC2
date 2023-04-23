import { Component } from '@angular/core';
import { CargarjsTemplatesService } from '../../Services/cargarjs-templates.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(
    private _CargarSc: CargarjsTemplatesService,
    private router : Router


  )
  // <script src="src/assets/vendor/apexcharts/apexcharts.min.js"></script>
  // <script src="src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  // <script src="src/assets/vendor/chart.js/chart.umd.js"></script>
  // <script src="src/assets/vendor/echarts/echarts.min.js"></script>
  // <script src="src/assets/vendor/quill/quill.min.js"></script>
  // <script src="src/assets/vendor/simple-datatables/simple-datatables.js"></script>
  // <script src="src/assets/vendor/tinymce/tinymce.min.js"></script>
  // <script src="src/assets/vendor/php-email-form/validate.js"></script>

  {
    {
      _CargarSc.carga_apexcharts(["hapexcharts.min"])
      _CargarSc.carga_boostrap(["bootstrap.bundle.min"])
      _CargarSc.carga_mainjs(["main"])
      _CargarSc.carga_chartjs(["chart.umd"])
      _CargarSc.carga_echarts(["echarts.min"])
      _CargarSc.carga_quill(["quill.min"])

      _CargarSc.carga_simpledatatables(["simple-datatables"])
      _CargarSc.carga_tinymce(["tinymce.min"])
      _CargarSc.carga_phpemailform(["validate"])
      
      
      

    



    }
  }
}
