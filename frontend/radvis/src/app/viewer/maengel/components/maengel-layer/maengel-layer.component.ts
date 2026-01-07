import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import Feature, { FeatureLike } from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

import { RadVisFeature } from 'src/app/shared/models/rad-vis-feature';
import { OlMapService } from 'src/app/shared/services/ol-map.service';

import { AbstractInfrastrukturLayerComponent } from
    'src/app/viewer/viewer-shared/components/abstract-infrastruktur-layer.component';
import { FeatureHighlightService } from
    'src/app/viewer/viewer-shared/services/feature-highlight.service';

import { MAENGEL } from '../../models/maengel.infrastruktur';
import { MaengelRoutingService } from '../../services/maengel-routing.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MaengelListenView } from '../../models/maengel-listen-view';

@Component({
  selector: 'rad-maengel-layer',
  templateUrl: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MaengelLayerComponent
  extends AbstractInfrastrukturLayerComponent<MaengelListenView>
  implements OnDestroy
{
  public readonly HIGHLIGHTED_PROPERTY = 'highlighted';

  private olLayer: VectorLayer;

  constructor(
    private olMapService: OlMapService,
    routingService: MaengelRoutingService,
    filterService: MaengelFilterService,
    featureHighlightService: FeatureHighlightService
  ) {
    super(routingService, filterService, featureHighlightService, MAENGEL);

    this.olLayer = this.createLayer(0);
    this.olLayer.setStyle(this.maengelPointStyle);
    this.olLayer.setZIndex(10);

    this.olMapService.addLayer(this.olLayer);
    this.initServiceSubscriptions();
  }

  ngOnDestroy(): void {
    this.olMapService.removeLayer(this.olLayer);
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected convertToFeature(infrastruktur: MaengelListenView): Feature<Geometry>[] {
    if (
      infrastruktur.longitude == null ||
      infrastruktur.latitude == null
    ) {
      return [];
    }

    const feature = new Feature(
      new Point(
        fromLonLat([
          infrastruktur.longitude,
          infrastruktur.latitude,
        ])
      )
    );

    feature.setId(infrastruktur.id);

    return [feature];
  }

  protected extractIdFromFeature(hf: RadVisFeature): number {
    return Number(hf.id);
  }

  private static getMaengelIconStyle(highlighted: boolean): Style[] {
    return AbstractInfrastrukturLayerComponent.infrastrukturIconStyle(
      highlighted,
      MAENGEL
    );
  }

  private maengelPointStyle = (feature: FeatureLike): Style | Style[] => {
    const highlighted: boolean = feature.get(this.HIGHLIGHTED_PROPERTY);

    if (highlighted && this.selectedId === feature.getId()) {
      return new Style();
    }

    return MaengelLayerComponent.getMaengelIconStyle(highlighted);
  };
}
