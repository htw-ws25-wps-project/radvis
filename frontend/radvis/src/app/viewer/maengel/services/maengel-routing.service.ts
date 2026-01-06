import { Injectable } from '@angular/core';
import {Route, Router} from '@angular/router';
import { MAENGEL } from '../models/maengel.infrastruktur';
import { AbstractInfrastrukturenRoutingService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-routing.service';
import {MaengelTabelleComponent} from "../components/maengel-tabelle/maengel-tabelle.component";
import {MaengelEditorComponent} from "../components/maengel-editor/maengel-editor.component";


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
  public static getChildRoutes(): Route[] {
    return [
      {
        path: '',
        component: MaengelTabelleComponent,
      },
      {
        path: 'create',
        component: MaengelEditorComponent,
        data: { isCreator: true },
      },
      {
        path: ':id',
        component: MaengelEditorComponent,
        data: { isCreator: false },
      },
    ];
  }

}
