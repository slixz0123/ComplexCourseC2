import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaHomeComponent } from './bienvenida-home.component';

describe('BienvenidaHomeComponent', () => {
  let component: BienvenidaHomeComponent;
  let fixture: ComponentFixture<BienvenidaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
