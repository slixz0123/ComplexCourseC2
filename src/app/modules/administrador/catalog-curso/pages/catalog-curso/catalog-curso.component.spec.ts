import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCursoComponent } from './catalog-curso.component';

describe('CatalogCursoComponent', () => {
  let component: CatalogCursoComponent;
  let fixture: ComponentFixture<CatalogCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
