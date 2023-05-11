import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCursoComponent } from './tipo-curso.component';

describe('TipoCursoComponent', () => {
  let component: TipoCursoComponent;
  let fixture: ComponentFixture<TipoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
