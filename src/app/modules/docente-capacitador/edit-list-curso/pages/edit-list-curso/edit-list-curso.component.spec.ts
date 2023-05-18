import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListCursoComponent } from './edit-list-curso.component';

describe('EditListCursoComponent', () => {
  let component: EditListCursoComponent;
  let fixture: ComponentFixture<EditListCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
