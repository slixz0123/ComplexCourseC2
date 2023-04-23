import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidCursosCapComponent } from './valid-cursos-cap.component';

describe('ValidCursosCapComponent', () => {
  let component: ValidCursosCapComponent;
  let fixture: ComponentFixture<ValidCursosCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidCursosCapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidCursosCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
