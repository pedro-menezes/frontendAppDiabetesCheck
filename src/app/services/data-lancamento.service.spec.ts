import { TestBed } from '@angular/core/testing';

import { DataLancamentoService } from './data-lancamento.service';

describe('DataLancamentoService', () => {
  let service:DataLancamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLancamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
