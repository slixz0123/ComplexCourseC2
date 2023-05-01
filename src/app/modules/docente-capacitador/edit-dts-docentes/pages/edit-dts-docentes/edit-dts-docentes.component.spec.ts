import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDtsDocentesComponent } from './edit-dts-docentes.component';

describe('EditDtsDocentesComponent', () => {
  let component: EditDtsDocentesComponent;
  let fixture: ComponentFixture<EditDtsDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDtsDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDtsDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
