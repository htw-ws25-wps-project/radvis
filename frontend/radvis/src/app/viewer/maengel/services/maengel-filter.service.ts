import { Injectable } from '@angular/core';
import { AbstractInfrastrukturenFilterService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';
import { InfrastrukturenSelektionService } from 'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import { FilterQueryParamsService } from 'src/app/viewer/viewer-shared/services/filter-query-params.service';
import { MAENGEL } from '../models/maengel.infrastruktur';

@Injectable({
  providedIn: 'root',
})
export class MaengelFilterService
  extends AbstractInfrastrukturenFilterService<any> {

  constructor(
    infrastrukturenSelektionService: InfrastrukturenSelektionService,
    filterQueryParamsService: FilterQueryParamsService
  ) {
    super(
      infrastrukturenSelektionService,
      MAENGEL,
      filterQueryParamsService
    );

    this.init();
  }

  protected getAll(): Promise<any[]> {
    return Promise.resolve([]);
  }

  protected getInfrastrukturValueForKey(
    item: any,
    key: string
  ): string | string[] {
    return item[key];
  }
}
