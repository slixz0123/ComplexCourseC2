import { TestBed } from '@angular/core/testing';

import { CargarjsHomeService } from './cargarjs-home.service';

describe('CargarjsHomeService', () => {
  let service: CargarjsHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarjsHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
