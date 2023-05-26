import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReglamentoComponent } from './ver-reglamento.component';

describe('VerReglamentoComponent', () => {
  let component: VerReglamentoComponent;
  let fixture: ComponentFixture<VerReglamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReglamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerReglamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
