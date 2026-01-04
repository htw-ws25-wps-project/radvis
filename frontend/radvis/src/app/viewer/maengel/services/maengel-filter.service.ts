import { Injectable } from '@angular/core';
import { AbstractInfrastrukturenFilterService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';
import { InfrastrukturenSelektionService } from 'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import { FilterQueryParamsService } from 'src/app/viewer/viewer-shared/services/filter-query-params.service';
import { MAENGEL } from '../models/maengel.infrastruktur';
import { HttpClient } from '@angular/common/http';
import { mapReportToMaengelList } from '../adapters/maengel.adapter';
import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';

@Injectable({
  providedIn: 'root',
})
export class MaengelFilterService
  extends AbstractInfrastrukturenFilterService<MaengelListenView> {

  constructor(
    infrastrukturenSelektionService: InfrastrukturenSelektionService,
    filterQueryParamsService: FilterQueryParamsService,
    private http: HttpClient
  ) {
    super(
      infrastrukturenSelektionService,
      MAENGEL,
      filterQueryParamsService
    );
    this.init();
    // 🔴 DEBUG
    (this as any).loadAll?.();

  }
  protected getAll(): Promise<MaengelListenView[]> {
    console.log('[MAENGEL] getAll() CALLED');

    return this.http
      .get<ReportBackendDTO[]>('/api/reports')
      .toPromise()
      .then(reports => {
        console.log('[MAENGEL] backend reports', reports);

        return reports.map(r => ({
          id: r.id,
          issue: r.issue,
          beschreibung: r.description,
          latitude: r.latitude,
          longitude: r.longitude,
        }));
      });
  }

  protected getInfrastrukturValueForKey(
    item: MaengelListenView,
    key: string
  ): string | string[] {
    return (item as any)[key];
  }
}
