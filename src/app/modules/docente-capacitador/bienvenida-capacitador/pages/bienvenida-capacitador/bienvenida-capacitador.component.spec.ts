import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaCapacitadorComponent } from './bienvenida-capacitador.component';

describe('BienvenidaCapacitadorComponent', () => {
  let component: BienvenidaCapacitadorComponent;
  let fixture: ComponentFixture<BienvenidaCapacitadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaCapacitadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaCapacitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
