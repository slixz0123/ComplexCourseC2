import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListEspecialidadComponent } from './edit-list-especialidad.component';

describe('EditListEspecialidadComponent', () => {
  let component: EditListEspecialidadComponent;
  let fixture: ComponentFixture<EditListEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
