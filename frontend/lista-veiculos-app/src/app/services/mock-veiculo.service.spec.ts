import { TestBed } from '@angular/core/testing';

import { MockVeiculoService } from './mock-veiculo.service';

describe('MockVeiculoService', () => {
  let service: MockVeiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockVeiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
