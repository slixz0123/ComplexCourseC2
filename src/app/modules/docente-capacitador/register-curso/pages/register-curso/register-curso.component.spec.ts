import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCursoComponent } from './register-curso.component';

describe('RegisterCursoComponent', () => {
  let component: RegisterCursoComponent;
  let fixture: ComponentFixture<RegisterCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
