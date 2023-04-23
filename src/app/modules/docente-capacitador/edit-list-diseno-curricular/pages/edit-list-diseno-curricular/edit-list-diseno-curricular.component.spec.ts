import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListDisenoCurricularComponent } from './edit-list-diseno-curricular.component';

describe('EditListDisenoCurricularComponent', () => {
  let component: EditListDisenoCurricularComponent;
  let fixture: ComponentFixture<EditListDisenoCurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListDisenoCurricularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListDisenoCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
