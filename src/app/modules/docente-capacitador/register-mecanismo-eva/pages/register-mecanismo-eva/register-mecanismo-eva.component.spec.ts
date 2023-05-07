import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMecanismoEvaComponent } from './register-mecanismo-eva.component';

describe('RegisterMecanismoEvaComponent', () => {
  let component: RegisterMecanismoEvaComponent;
  let fixture: ComponentFixture<RegisterMecanismoEvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMecanismoEvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMecanismoEvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
