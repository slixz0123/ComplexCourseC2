import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApliCursosComponent } from './apli-cursos.component';

describe('ApliCursosComponent', () => {
  let component: ApliCursosComponent;
  let fixture: ComponentFixture<ApliCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApliCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApliCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
