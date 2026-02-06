import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractInfrastrukturenFilterService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';
import { InfrastrukturenSelektionService } from 'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import { FilterQueryParamsService } from 'src/app/viewer/viewer-shared/services/filter-query-params.service';

import { MAENGEL } from '../models/maengel.infrastruktur';
import { mapReportToMaengelList } from '../adapters/maengel.adapter';
import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';

@Injectable({
  providedIn: 'root',
})
/**
 * Filter-/Daten-Service für „Mängel“ (Listen-/Tabellenansicht).
 *
 * Erweitert {@link AbstractInfrastrukturenFilterService} und liefert:
 * - Laden aller Mängel vom Backend,
 * - Mapping in {@link MaengelListenView},
 * - Zugriff auf feldbasierte Filterwerte ({@link getInfrastrukturValueForKey}),
 * - (Re-)Initialisierung via {@link reload}.
 *
 * ## Backend
 * - `GET /api/reports` liefert {@link ReportBackendDTO}[]
 *
 * ## Selektion
 * Die Basisklasse reagiert über {@link init} auf die selektierte Infrastruktur-Art.
 * Sobald {@link MAENGEL} selektiert ist, werden Daten automatisch neu geladen.
 */
export class MaengelFilterService extends AbstractInfrastrukturenFilterService<MaengelListenView> {
  constructor(
    infrastrukturenSelektionService: InfrastrukturenSelektionService,
    filterQueryParamsService: FilterQueryParamsService,
    private http: HttpClient
  ) {
    super(infrastrukturenSelektionService, MAENGEL, filterQueryParamsService);
    this.init();
  }

  /**
   * Lädt alle Mängel-Reports und mappt sie in {@link MaengelListenView}.
   *
   * @returns Promise mit der vollständigen Liste (ungefiltert)
   */
  protected getAll(): Promise<MaengelListenView[]> {
    return this.http
      .get<ReportBackendDTO[]>('/api/reports')
      .toPromise()
      .then((reports: ReportBackendDTO[] | undefined) => (reports ?? []).map(mapReportToMaengelList));
  }

  /**
   * Liefert für ein Feld den String-Wert, der für die Filterlogik verwendet wird.
   *
   * @param item Listeneintrag
   * @param key Feldname (z. B. `issue`, `beschreibung`)
   * @returns filterbarer String (bei unbekannten Keys leer)
   */
  public getInfrastrukturValueForKey(item: MaengelListenView, key: string): string {
    const EMPTY = '';

    switch (key) {
      case 'issue':
        return item.issue ?? EMPTY;

      case 'beschreibung':
        return item.beschreibung ?? EMPTY;

      default:
        return EMPTY;
    }
  }

  /**
   * Initialisiert das Selektions-/Reload-Verhalten neu.
   *
   * (Bestehendes Verhalten beibehalten: ruft {@link init} auf.)
   */
  public reload(): void {
    this.init();
  }
}
