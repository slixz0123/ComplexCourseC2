import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaSupAdminsComponent } from './bienvenida-sup-admins.component';

describe('BienvenidaSupAdminsComponent', () => {
  let component: BienvenidaSupAdminsComponent;
  let fixture: ComponentFixture<BienvenidaSupAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaSupAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaSupAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
