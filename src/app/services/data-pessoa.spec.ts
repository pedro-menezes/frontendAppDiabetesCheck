import { TestBed } from '@angular/core/testing';

import { DataPessoaService } from './data-pessoa.service';

describe('DataPessoaService', () => {
  let service: DataPessoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPessoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
