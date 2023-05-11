import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaCertificadosComponent } from './entrega-certificados.component';

describe('EntregaCertificadosComponent', () => {
  let component: EntregaCertificadosComponent;
  let fixture: ComponentFixture<EntregaCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaCertificadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
