import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListNotasComponent } from './edit-list-notas.component';

describe('EditListNotasComponent', () => {
  let component: EditListNotasComponent;
  let fixture: ComponentFixture<EditListNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListNotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
