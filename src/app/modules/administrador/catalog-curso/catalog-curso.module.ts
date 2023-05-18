import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatalogCursoRoutingModule } from './catalog-curso-routing.module';
import { CatalogCursoComponent } from './pages/catalog-curso/catalog-curso.component';


@NgModule({
  declarations: [
    CatalogCursoComponent
  ],
  imports: [
    CommonModule,
    CatalogCursoRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    CatalogCursoComponent
  ]
})
export class CatalogCursoModule { }
