import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IssueService } from './issue.service';
import { Issue } from '../models/issue.model';

describe('IssueService', () => {
  let service: IssueService;
  let httpMock: HttpTestingController;

  const mockIssues: Issue[] = [
    'Schlagloch',
    'Bewuchs',
    'Keine Kategorie',
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssueService],
    });

    service = TestBed.inject(IssueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('calls GET /api/issues and returns response unchanged', () => {
    service.getIssues().subscribe(result => {
      expect(result).toEqual(mockIssues);
    });

    const req = httpMock.expectOne('/api/issues');
    expect(req.request.method).toBe('GET');

    req.flush(mockIssues);
  });
});
