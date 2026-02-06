import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';
import { mapReportToMaengelList } from '../adapters/maengel.adapter';

@Injectable({ providedIn: 'root' })
/**
 * Service für Backend-Zugriffe im Mängel-Kontext.
 *
 * ## Aufgaben
 * - Laden von Mängel-Reports (Liste und Detail)
 * - Aktualisieren des Status eines Reports
 * - Mapping von Backend-DTOs ({@link ReportBackendDTO}) in UI-View-Models ({@link MaengelListenView})
 *
 * ## Endpunkte
 * - `GET /api/reports` – alle Reports
 * - `GET /api/reports/:id` – Report-Details
 * - `PATCH /api/reports/:id/status` – Status aktualisieren
 */
export class MaengelService {
  constructor(private http: HttpClient) {}

  /**
   * Lädt alle Mängel-Reports und mappt sie in {@link MaengelListenView}-Einträge
   * (für Listen-/Tabellenansichten).
   *
   * @returns Observable mit der gemappten Liste
   */
  getAll(): Observable<MaengelListenView[]> {
    return this.http.get<ReportBackendDTO[]>('/api/reports').pipe(
      map((reports: ReportBackendDTO[]) => reports.map(mapReportToMaengelList))
    );
  }

  /**
   * Lädt einen Report per ID (Detailansicht).
   *
   * @param id Report-ID
   * @returns Observable mit dem Backend-DTO
   */
  getById(id: number): Observable<ReportBackendDTO> {
    return this.http.get<ReportBackendDTO>(`/api/reports/${id}`);
  }

  /**
   * Aktualisiert den Status eines Reports.
   *
   * @param id Report-ID
   * @param command Patch-Command mit neuem Status
   * @returns Observable, das bei Erfolg `void` liefert
   */
  updateStatus(id: number, command: { status: string }): Observable<void> {
    return this.http.patch<void>(`/api/reports/${id}/status`, command);
  }
}
