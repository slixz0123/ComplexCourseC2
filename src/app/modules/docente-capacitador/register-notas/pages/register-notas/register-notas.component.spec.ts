import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNotasComponent } from './register-notas.component';

describe('RegisterNotasComponent', () => {
  let component: RegisterNotasComponent;
  let fixture: ComponentFixture<RegisterNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
