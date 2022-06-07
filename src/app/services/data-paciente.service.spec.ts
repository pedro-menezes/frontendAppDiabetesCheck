import { TestBed } from '@angular/core/testing';

import { DataPacienteService } from './data-paciente.service';

describe('DataPacienteService', () => {
  let service: DataPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
