import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { InfrastrukturenSelektionService } from
    'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import {ViewerRoutingService} from "../../../viewer-shared/services/viewer-routing.service";
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MAENGEL } from '../../models/maengel.infrastruktur';

@Component({
  selector: 'rad-maengel-tool',
  templateUrl: './maengel-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MaengelToolComponent {

  tabelleRoute = ['.'];

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
  ) {
    this.infrastrukturenSelektionService.selectInfrastrukturen(MAENGEL);
    this.maengelFilterService.refetchData();
  }

  onClose(): void {
    this.viewerRoutingService.toViewer();
  }
}
