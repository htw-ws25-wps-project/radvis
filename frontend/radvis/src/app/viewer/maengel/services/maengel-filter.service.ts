import { Injectable } from '@angular/core';
import { AbstractInfrastrukturenFilterService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';

@Injectable({
  providedIn: 'root',
})
export class MaengelFilterService extends AbstractInfrastrukturenFilterService {

  constructor() {
    super();
  }

  /**
   * Wird vom Viewer genutzt, um Tabellen- und Kartenwerte
   * konsistent aufzulösen.
   */
  public getInfrastrukturValueForKey(key: string): string {
    return key;
  }
}
