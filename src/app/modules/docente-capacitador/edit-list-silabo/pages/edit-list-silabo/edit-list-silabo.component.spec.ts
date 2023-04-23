import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListSilaboComponent } from './edit-list-silabo.component';

describe('EditListSilaboComponent', () => {
  let component: EditListSilaboComponent;
  let fixture: ComponentFixture<EditListSilaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListSilaboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListSilaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
