import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractInfrastrukturenRoutingService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-routing.service';
import { MAENGEL } from '../models/maengel.infrastruktur';

@Injectable({
  providedIn: 'root',
})
export class MaengelRoutingService
  extends AbstractInfrastrukturenRoutingService {

  constructor(router: Router) {
    super(router, MAENGEL);
  }

  public getCreatorRoute(): string[] {
    return ['viewer', MAENGEL.pathElement, 'create'];
  }
}
