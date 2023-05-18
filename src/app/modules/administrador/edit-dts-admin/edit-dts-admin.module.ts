import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDtsAdminRoutingModule } from './edit-dts-admin-routing.module';
import { EditDtsAdminComponent } from './pages/edit-dts-admin/edit-dts-admin.component';

@NgModule({
  declarations: [
    EditDtsAdminComponent
  ],
  imports: [
    CommonModule,
    EditDtsAdminRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    EditDtsAdminComponent
  ]
})
export class EditDtsAdminModule { }
