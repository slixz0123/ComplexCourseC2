import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidHojasvidaCapacitadoresComponent } from './valid-hojasvida-capacitadores.component';

describe('ValidHojasvidaCapacitadoresComponent', () => {
  let component: ValidHojasvidaCapacitadoresComponent;
  let fixture: ComponentFixture<ValidHojasvidaCapacitadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidHojasvidaCapacitadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidHojasvidaCapacitadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
