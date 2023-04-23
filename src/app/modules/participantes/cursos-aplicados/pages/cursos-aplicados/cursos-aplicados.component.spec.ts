import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAplicadosComponent } from './cursos-aplicados.component';

describe('CursosAplicadosComponent', () => {
  let component: CursosAplicadosComponent;
  let fixture: ComponentFixture<CursosAplicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosAplicadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosAplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
