import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarSupAdminComponent } from './side-bar-sup-admin.component';

describe('SideBarSupAdminComponent', () => {
  let component: SideBarSupAdminComponent;
  let fixture: ComponentFixture<SideBarSupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarSupAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarSupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
