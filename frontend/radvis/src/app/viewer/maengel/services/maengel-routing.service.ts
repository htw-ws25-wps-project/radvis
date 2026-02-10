import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';


import { AbstractInfrastrukturenRoutingService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-routing.service';
import { MAENGEL } from '../models/maengel.infrastruktur';
import { MaengelTabelleComponent } from '../components/maengel-tabelle/maengel-tabelle.component';
import { MaengelEditorComponent } from '../components/maengel-editor/maengel-editor.component';

@Injectable({
  providedIn: 'root',
})
/**
 * Routing-Service für den „Mängel“-Bereich im Viewer.
 *
 * Erweitert {@link AbstractInfrastrukturenRoutingService} und kapselt damit alle
 * Navigationen und Route-Definitionen, die spezifisch für {@link MAENGEL} sind.
 *
 * ## Aufgaben
 * - Erzeugt Routen zu Listen- und Editor-Ansichten (inkl. Creator-Route)
 * - Liefert die Child-Routes für das Feature-Modul ({@link getChildRoutes})
 *
 * ## Selektion
 * Die Basisklasse stellt u. a. den Stream {@code selectedInfrastrukturId$} bereit, der von
 * Komponenten (z. B. Tabelle) zur Hervorhebung/Selektion genutzt werden kann.
 */
export class MaengelRoutingService extends AbstractInfrastrukturenRoutingService {
  private forceCloseEditorSubject = new Subject<void>();
  public forceCloseEditor$ = this.forceCloseEditorSubject.asObservable();

  constructor(router: Router) {
    super(router, MAENGEL);
  }

  forceCloseEditor(): void {
    this.forceCloseEditorSubject.next();
  }

  toInfrastrukturEditorFromTable(id: number): void {
    this.forceCloseEditor();
    this.toInfrastrukturEditor(id);
  }


  /**
   * Route zur „Erstellen“-Ansicht (Creator-Flow).
   *
   * @returns Router-Link-Segmente für `['viewer', 'maengel', 'create']`
   */
  public getCreatorRoute(): string[] {
    return ['viewer', MAENGEL.pathElement, 'create'];
  }

  /**
   * Child-Routes für das Mängel-Feature.
   *
   * - `''` zeigt die Tabelle ({@link MaengelTabelleComponent})
   * - `'create'` öffnet den Editor im Creator-Modus
   * - `':id'` öffnet den Editor für einen bestehenden Report
   *
   * Die Route-Data `isCreator` kann im Editor ausgewertet werden, um UI/Verhalten anzupassen.
   */
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
