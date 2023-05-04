import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListDiasComponent } from './edit-list-dias.component';

describe('EditListDiasComponent', () => {
  let component: EditListDiasComponent;
  let fixture: ComponentFixture<EditListDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListDiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
