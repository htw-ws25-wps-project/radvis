import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MaengelService } from './maengel.service';
import { ReportBackendDTO } from '../models/report-backend.dto';
import { MaengelListenView } from '../models/maengel-listen-view';
import { mapReportToMaengelList } from '../adapters/maengel.adapter';

describe('MaengelService', () => {
  let service: MaengelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaengelService],
    });

    service = TestBed.inject(MaengelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() calls GET /api/reports and maps data correctly', () => {
    const backendReports: ReportBackendDTO[] = [
      { id: 1 } as ReportBackendDTO,
      { id: 2 } as ReportBackendDTO,
    ];

    const expectedMapped: MaengelListenView[] =
      backendReports.map(mapReportToMaengelList);

    service.getAll().subscribe(result => {
      expect(result).toEqual(expectedMapped);
    });

    const req = httpMock.expectOne('/api/reports');
    expect(req.request.method).toBe('GET');

    req.flush(backendReports);
  });

  it('getById(id) calls GET /api/reports/{id}', () => {
    const report: ReportBackendDTO = { id: 5 } as ReportBackendDTO;

    service.getById(5).subscribe(result => {
      expect(result).toEqual(report);
    });

    const req = httpMock.expectOne('/api/reports/5');
    expect(req.request.method).toBe('GET');

    req.flush(report);
  });

  it('propagates 404 error for getById()', () => {
    service.getById(999).subscribe({
      next: () => fail('expected error'),
      error: error => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('/api/reports/999');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
