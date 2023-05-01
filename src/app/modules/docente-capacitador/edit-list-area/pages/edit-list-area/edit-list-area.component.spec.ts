import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListAreaComponent } from './edit-list-area.component';

describe('EditListAreaComponent', () => {
  let component: EditListAreaComponent;
  let fixture: ComponentFixture<EditListAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
