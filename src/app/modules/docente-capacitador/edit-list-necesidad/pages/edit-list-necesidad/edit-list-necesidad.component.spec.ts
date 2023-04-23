import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListNecesidadComponent } from './edit-list-necesidad.component';

describe('EditListNecesidadComponent', () => {
  let component: EditListNecesidadComponent;
  let fixture: ComponentFixture<EditListNecesidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListNecesidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListNecesidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
