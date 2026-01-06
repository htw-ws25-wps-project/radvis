import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';
import { mapReportToMaengelList } from '../adapters/maengel.adapter';

@Injectable({ providedIn: 'root' })
export class MaengelService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<MaengelListenView[]> {
    return this.http
      .get<ReportBackendDTO[]>('/api/reports')
      .pipe(
        map(reports => reports.map(mapReportToMaengelList))
      );
  }

  getById(id: number): Observable<ReportBackendDTO> {
    return this.http.get<ReportBackendDTO>(`/api/reports/${id}`);
  }
}
