import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    ReportesComponent
  ]
})
export class ReportesModule { }
