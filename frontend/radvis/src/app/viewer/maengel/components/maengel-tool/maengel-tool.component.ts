import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { InfrastrukturenSelektionService } from
    'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import {ViewerRoutingService} from "../../../viewer-shared/services/viewer-routing.service";
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MAENGEL } from '../../models/maengel.infrastruktur';
import {MaengelService} from "../../services/maengel.service";

@Component({
  selector: 'rad-maengel-tool',
  templateUrl: './maengel-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/**
 * Tool-Container für den „Mängel“-Bereich im Viewer.
 *
 * ## Verantwortung
 * - Setzt beim Öffnen den Infrastruktur-Kontext auf {@link MAENGEL} über {@link InfrastrukturenSelektionService}.
 * - Triggert ein (Neu-)Laden der Daten über {@link MaengelFilterService}.
 * - Stellt Routing-/UI-Hilfswerte für das Template bereit (z. B. {@link routerLinkActiveOptions}).
 * - Ermöglicht das Schließen des Tools und die Rücknavigation in den Viewer ({@link onClose}).
 *
 * Hinweis: {@link MaengelService} ist injiziert, auch wenn er in dieser Klasse aktuell nicht direkt
 * genutzt wird (möglicherweise Template-Nutzung oder geplante Erweiterung).
 */
export class MaengelToolComponent {
  /**
   * Route zur Tabellen-Ansicht innerhalb des Tool-Routings.
   */
  tabelleRoute = ['.'];

  /**
   * Options für `routerLinkActive`, damit die Tabellen-Route nur bei exaktem Pfad als aktiv gilt.
   */
  routerLinkActiveOptions: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  constructor(
    private viewerRoutingService: ViewerRoutingService,
    private infrastrukturenSelektionService: InfrastrukturenSelektionService,
    private maengelFilterService: MaengelFilterService,
    private maengelService: MaengelService,
  ) {
    this.infrastrukturenSelektionService.selectInfrastrukturen(MAENGEL);
    this.maengelFilterService.refetchData();
  }

  onClose(): void {
    this.viewerRoutingService.toViewer();
  }
}
