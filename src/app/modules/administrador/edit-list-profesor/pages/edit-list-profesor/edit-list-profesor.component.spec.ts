import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListProfesorComponent } from './edit-list-profesor.component';

describe('EditListProfesorComponent', () => {
  let component: EditListProfesorComponent;
  let fixture: ComponentFixture<EditListProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
