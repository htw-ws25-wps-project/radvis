import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import {
  MOCK_ISSUES,
  MOCK_ISSUE_LABELS,
  MOCK_REPORTS
} from './mocks/mock-data';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('[MOCK INTERCEPTOR ACTIVE]', req.method, req.url);

    if (!environment.useMockBackend) {
      return next.handle(req);
    }

    /* ---------- IssueController ---------- */

    // GET /api/issues
    if (req.method === 'GET' && req.url.includes('/api/issues')) {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_ISSUES
      }));
    }

    // GET /api/issue-labels
    if (req.method === 'GET' && req.url.includes('/api/issue-labels')) {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_ISSUE_LABELS
      }));
    }

    /* ---------- ReportController ---------- */

    /* ---------- ReportController ---------- */

  // GET /api/reports/{id}
    if (req.method === 'GET' && req.url.match(/\/api\/reports\/\d+$/)) {
      const id = Number(req.url.split('/').pop());
      const report = MOCK_REPORTS.find(r => r.id === id);

      console.log('[MOCK] returning report', report);

      return of(new HttpResponse({
        status: report ? 200 : 404,
        body: report ?? null
      }));
    }

  // GET /api/reports
    if (req.method === 'GET' && req.url.endsWith('/api/reports')) {
      console.log('[MOCK] returning report list');

      return of(new HttpResponse({
        status: 200,
        body: MOCK_REPORTS
      }));
    }

    // POST /api/reports
    if (req.method === 'POST' && req.url.includes('/api/reports')) {
      const newReport = {
        id: MOCK_REPORTS.length
          ? Math.max(...MOCK_REPORTS.map(r => r.id)) + 1
          : 1,
        ...req.body,
        creationDate: new Date().toISOString()
      };

      MOCK_REPORTS.push(newReport);

      return of(new HttpResponse({
        status: 201,
        body: newReport
      }));
    }
    console.log('[MOCK → REAL]', req.method, req.url);
    return next.handle(req);


  }
}
