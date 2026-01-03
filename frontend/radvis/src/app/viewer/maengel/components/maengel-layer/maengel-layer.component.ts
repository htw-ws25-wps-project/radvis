import { Component, OnDestroy } from '@angular/core';
import { AbstractInfrastrukturLayerComponent } from
    'src/app/viewer/viewer-shared/components/abstract-infrastruktur-layer.component';
import { MAENGEL } from '../../models/maengel.infrastruktur';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-maengel-layer',
  template: '',
})
export class MaengelLayerComponent
  extends AbstractInfrastrukturLayerComponent
  implements OnDestroy {

  constructor() {
    super(MAENGEL);
  }

  protected createLayer(): VectorLayer<VectorSource> {
    return new VectorLayer({
      source: new VectorSource(),
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
