import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetalleMevaComponent } from './register-detalle-meva.component';

describe('RegisterDetalleMevaComponent', () => {
  let component: RegisterDetalleMevaComponent;
  let fixture: ComponentFixture<RegisterDetalleMevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDetalleMevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDetalleMevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
