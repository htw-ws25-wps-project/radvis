import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Service zum Laden der verfügbaren Issue-Kategorien für Mangelmeldungen.
 *
 * ## Zweck
 * Stellt die vom Backend bereitgestellten {@link Issue}-Werte bereit, typischerweise für
 * Dropdowns/Filter im UI.
 *
 * ## Backend-Endpunkt
 * - `GET /api/issues` liefert eine Liste von Issue-Labels (Strings).
 *
 * @see Issue
 */
export class IssueService {
  constructor(private http: HttpClient) {}

  /**
   * Lädt die verfügbaren {@link Issue}-Kategorien vom Backend.
   *
   * @returns Observable mit der Liste der Issues
   *
   * @example
   * ```ts
   * this.issueService.getIssues().subscribe(issues => {
   *   this.issues = issues;
   * });
   * ```
   */
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>('/api/issues');
  }
}
