import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSupAdminComponent } from './welcome-sup-admin.component';

describe('WelcomeSupAdminComponent', () => {
  let component: WelcomeSupAdminComponent;
  let fixture: ComponentFixture<WelcomeSupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeSupAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeSupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
