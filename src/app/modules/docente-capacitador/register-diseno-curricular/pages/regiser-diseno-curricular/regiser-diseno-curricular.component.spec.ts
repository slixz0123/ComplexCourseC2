import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiserDisenoCurricularComponent } from './regiser-diseno-curricular.component';

describe('RegiserDisenoCurricularComponent', () => {
  let component: RegiserDisenoCurricularComponent;
  let fixture: ComponentFixture<RegiserDisenoCurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegiserDisenoCurricularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiserDisenoCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
