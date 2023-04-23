import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNecesidadComponent } from './register-necesidad.component';

describe('RegisterNecesidadComponent', () => {
  let component: RegisterNecesidadComponent;
  let fixture: ComponentFixture<RegisterNecesidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNecesidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNecesidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
