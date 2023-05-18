import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDtsAdminComponent } from './edit-dts-admin.component';

describe('EditDtsAdminComponent', () => {
  let component: EditDtsAdminComponent;
  let fixture: ComponentFixture<EditDtsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDtsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDtsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
