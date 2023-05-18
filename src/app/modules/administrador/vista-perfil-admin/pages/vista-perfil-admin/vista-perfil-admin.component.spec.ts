import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPerfilAdminComponent } from './vista-perfil-admin.component';

describe('VistaPerfilAdminComponent', () => {
  let component: VistaPerfilAdminComponent;
  let fixture: ComponentFixture<VistaPerfilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPerfilAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPerfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
