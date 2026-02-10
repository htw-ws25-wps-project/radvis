import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import Feature, { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Style } from 'ol/style';
import { transform } from 'ol/proj';

import { RadVisFeature } from 'src/app/shared/models/rad-vis-feature';
import { OlMapService } from 'src/app/shared/services/ol-map.service';

import { AbstractInfrastrukturLayerComponent } from 'src/app/viewer/viewer-shared/components/abstract-infrastruktur-layer.component';
import { FeatureHighlightService } from 'src/app/viewer/viewer-shared/services/feature-highlight.service';

import { MAENGEL } from '../../models/maengel.infrastruktur';
import { MaengelRoutingService } from '../../services/maengel-routing.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MaengelListenView } from '../../models/maengel-listen-view';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'rad-maengel-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/**
 * OpenLayers-Layer für „Mängel“ im Viewer.
 *
 * Diese Komponente erzeugt einen Vektor-Layer für {@link MaengelListenView}-Einträge und
 * hängt ihn an die Karte ({@link OlMapService}). Sie erweitert {@link AbstractInfrastrukturLayerComponent}
 * und nutzt damit das gemeinsame Verhalten für:
 * - Selektion/Highlighting,
 * - Routing-Anbindung,
 * - Filter-/Daten-Subscriptions.
 *
 * ## Koordinatensystem
 * Die Mängel-Geometrie kommt als GeoJSON-Point in EPSG:4326 (Lon/Lat).
 * Für die Kartenanzeige wird nach EPSG:25832 transformiert.
 *
 * ## Styling / Highlighting
 * Das Styling basiert auf {@link AbstractInfrastrukturLayerComponent.infrastrukturIconStyle}.
 * Zusätzlich wird über das Feature-Attribut {@link HIGHLIGHTED_PROPERTY} gesteuert, ob ein Feature
 * als „highlighted“ gilt.
 */
export class MaengelLayerComponent
  extends AbstractInfrastrukturLayerComponent<MaengelListenView>
  implements OnDestroy
{

  private featureById = new Map<number, Feature<Point>>();

  /**
   * Name der Feature-Property, die den Highlight-Zustand trägt.
   *
   * Erwartet wird, dass {@link FeatureHighlightService} (oder Basisklasse) dieses Flag
   * am Feature setzt/entfernt.
   */
  public readonly HIGHLIGHTED_PROPERTY = 'highlighted';

  /**
   * Interner OpenLayers-Vektorlayer, der die Mängel-Features rendert.
   */
  private olLayer: VectorLayer;

  constructor(
    private olMapService: OlMapService,
    routingService: MaengelRoutingService,
    filterService: MaengelFilterService,
    featureHighlightService: FeatureHighlightService
  ) {
    super(routingService, filterService, featureHighlightService, MAENGEL);

    this.olLayer = this.createLayer(0);
    this.olLayer.setStyle(this.styleWithHighlightCircleFn);
    this.olLayer.setZIndex(10);

    this.olMapService.addLayer(this.olLayer);
    this.initServiceSubscriptions();

    this.subscriptions.push(
      this.routingService.selectedInfrastrukturId$
        .pipe(filter((id): id is number => id !== null))
        .subscribe(id => {
          const f = this.vectorSource.getFeatureById(id);
          const geom = f?.getGeometry();

          if (geom) {
            this.olMapService.scrollIntoViewByGeometry(geom);
          }
        })
    );
  }

  /**
   * Entfernt den Layer von der Karte und räumt Subscriptions auf.
   */
  ngOnDestroy(): void {
    this.olMapService.removeLayer(this.olLayer);
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Konvertiert einen {@link MaengelListenView} in OpenLayers-Features.
   *
   * Die GeoJSON-Koordinaten liegen als `[longitude, latitude]` in EPSG:4326 vor und werden
   * für die Karte nach EPSG:25832 transformiert.
   *
   * @param infrastruktur Mangel-Listeneintrag (enthält GeoJSON-Point)
   * @returns Liste mit genau einem {@link Feature} (Point), dessen `id` gesetzt ist
   */
  protected convertToFeature(infrastruktur: MaengelListenView): Feature<Point>[] {
    const [lon, lat] = infrastruktur.geometrie.coordinates;

    const xy = transform([lon, lat], 'EPSG:4326', 'EPSG:25832');

    const feature = new Feature(new Point(xy));
    feature.setId(infrastruktur.id);

    this.featureById.set(infrastruktur.id, feature);

    return [feature];
  }

  /**
   * Extrahiert die numerische ID aus einem {@link RadVisFeature}.
   *
   * @param hf Feature aus der Karteninteraktion
   * @returns ID als Zahl
   */
  protected extractIdFromFeature(hf: RadVisFeature): number {
    return Number(hf.id);
  }

  /**
   * Liefert den Icon-Style für Mängel abhängig vom Highlight-Status.
   *
   * @param highlighted ob das Feature hervorgehoben ist
   */
  private static getMaengelIconStyle(highlighted: boolean): Style[] {
    return AbstractInfrastrukturLayerComponent.infrastrukturIconStyle(highlighted, MAENGEL);
  }

  /**
   * Style-Funktion für den Layer.
   *
   * - Nutzt {@link HIGHLIGHTED_PROPERTY} als Steuerflag für den Highlight-Zustand.
   * - Falls ein Feature gleichzeitig „highlighted“ ist und der aktuellen {@link selectedId} entspricht,
   *   wird ein leerer {@link Style} zurückgegeben (Sonderbehandlung der Darstellung).
   *
   * @param feature OpenLayers-Feature (oder FeatureLike) aus dem Render-Pipeline-Call
   */
  private maengelPointStyle = (feature: FeatureLike): Style | Style[] => {
    const highlighted: boolean = feature.get(this.HIGHLIGHTED_PROPERTY);

    if (highlighted && this.selectedId === feature.getId()) {
      return new Style();
    }

    return MaengelLayerComponent.getMaengelIconStyle(highlighted);
  };
}

