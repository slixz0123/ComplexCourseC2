import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponecesidadComponent } from './reponecesidad.component';

describe('ReponecesidadComponent', () => {
  let component: ReponecesidadComponent;
  let fixture: ComponentFixture<ReponecesidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponecesidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponecesidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
