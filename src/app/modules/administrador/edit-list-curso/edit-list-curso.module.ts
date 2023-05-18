import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditListCursoRoutingModule } from './edit-list-curso-routing.module';
import { EditListCursoComponent } from './pages/edit-list-curso/edit-list-curso.component';


@NgModule({
  declarations: [
    EditListCursoComponent
  ],
  imports: [
    CommonModule,
    EditListCursoRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],exports:[
    EditListCursoComponent
  ]
})
export class EditListCursoModule { }
