import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListAsistenciaComponent } from './edit-list-asistencia.component';

describe('EditListAsistenciaComponent', () => {
  let component: EditListAsistenciaComponent;
  let fixture: ComponentFixture<EditListAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
