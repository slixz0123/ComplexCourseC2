import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogCursoRoutingModule } from './catalog-curso-routing.module';
import { CatalogCursoComponent } from './pages/catalog-curso/catalog-curso.component';


@NgModule({
  declarations: [
    CatalogCursoComponent
  ],
  imports: [
    CommonModule,
    CatalogCursoRoutingModule
  ],
  exports:[
    CatalogCursoComponent
  ]
})
export class CatalogCursoModule { }
