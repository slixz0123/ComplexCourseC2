import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstitucionComponent } from './register-institucion.component';

describe('RegisterInstitucionComponent', () => {
  let component: RegisterInstitucionComponent;
  let fixture: ComponentFixture<RegisterInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInstitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
