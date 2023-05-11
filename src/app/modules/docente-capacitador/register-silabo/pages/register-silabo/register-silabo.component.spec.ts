import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSilaboComponent } from './register-silabo.component';

describe('RegisterSilaboComponent', () => {
  let component: RegisterSilaboComponent;
  let fixture: ComponentFixture<RegisterSilaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSilaboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSilaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
