import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InfrastrukturenSelektionService } from
    'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MAENGEL } from '../../models/maengel.infrastruktur';

@Component({
  selector: 'rad-maengel-tool',
  standalone: false,
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaengelToolComponent {

  constructor(
    private infrastrukturenSelektionService: InfrastrukturenSelektionService,
    private maengelFilterService: MaengelFilterService // ✅ AQUÍ
  ) {
    this.infrastrukturenSelektionService.selectInfrastrukturen(MAENGEL);

    // 🔑 Trigge
    this.maengelFilterService.refetchData();
  }
}
