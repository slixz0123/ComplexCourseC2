import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProgramasCapacitacionComponent } from './visualizar-programas-capacitacion.component';

describe('VisualizarProgramasCapacitacionComponent', () => {
  let component: VisualizarProgramasCapacitacionComponent;
  let fixture: ComponentFixture<VisualizarProgramasCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProgramasCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProgramasCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
