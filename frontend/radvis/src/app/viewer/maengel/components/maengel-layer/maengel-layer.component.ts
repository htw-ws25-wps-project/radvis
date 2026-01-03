import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { RadVisFeature } from 'src/app/shared/models/rad-vis-feature';
import { OlMapService } from 'src/app/shared/services/ol-map.service';
import { AbstractInfrastrukturLayerComponent } from
    'src/app/viewer/viewer-shared/components/abstract-infrastruktur-layer.component';
import { FeatureHighlightService } from
    'src/app/viewer/viewer-shared/services/feature-highlight.service';
import { MAENGEL } from '../../models/maengel.infrastruktur';
import { MaengelRoutingService } from '../../services/maengel-routing.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';

@Component({
  selector: 'rad-maengel-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaengelLayerComponent
  extends AbstractInfrastrukturLayerComponent<any>
  implements OnDestroy
{
  private layer: VectorLayer;

  constructor(
    routingService: MaengelRoutingService,
    filterService: MaengelFilterService,
    featureHighlightService: FeatureHighlightService,
    private olMapService: OlMapService
  ) {
    super(routingService, filterService, featureHighlightService, MAENGEL);

    this.layer = this.createLayer();
    this.layer.setStyle(this.styleWithHighlightCircleFn);
    this.olMapService.addLayer(this.layer);
    this.initServiceSubscriptions();
  }

  ngOnDestroy(): void {
    this.olMapService.removeLayer(this.layer);
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  protected convertToFeature(_: any): Feature<Geometry>[] {
    return [];
  }

  protected extractIdFromFeature(hf: RadVisFeature): number {
    return hf.id!;
  }
}
