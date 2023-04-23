import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogCursoComponent } from './pages/catalog-curso/catalog-curso.component';

const routes: Routes = [
  {
    path:'',
    component: CatalogCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogCursoRoutingModule { }
