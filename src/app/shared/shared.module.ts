import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SideBarAdminComponent } from './components/side-bar-admin/side-bar-admin.component';
import { SideBarSupAdminComponent } from './components/side-bar-sup-admin/side-bar-sup-admin.component';
import { SideBarParticipanteComponent } from './components/side-bar-participante/side-bar-participante.component';
import { HttpClientModule } from '@angular/common/http';
import { BulletInputDirective } from './directives/bullet-input.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    NavBarComponent,
    SideBarAdminComponent,
    SideBarSupAdminComponent,
    SideBarParticipanteComponent,
    BulletInputDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    NavBarComponent,
    SideBarAdminComponent,
    SideBarSupAdminComponent,
    SideBarParticipanteComponent
  ]
})
export class SharedModule { }
