import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDiasComponent } from './register-dias.component';

describe('RegisterDiasComponent', () => {
  let component: RegisterDiasComponent;
  let fixture: ComponentFixture<RegisterDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
