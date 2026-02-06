import { PointGeojson } from '../../../shared/models/geojson-geometrie';

/**
 * View-Model für die Anzeige von Mängeln in Listen- und Tabellenansichten.
 *
 * Dieses Interface ist bewusst UI-orientiert (Anzeige/Filter/Sortierung) und bildet
 * nur die Felder ab, die im Frontend für die Übersicht benötigt werden.
 *
 * ## Geometrie
 * {@link geometrie} ist ein GeoJSON-Point. Die Koordinatenreihenfolge entspricht GeoJSON:
 * `[longitude, latitude]` in EPSG:4326.
 *
 * Hinweis: Für die Darstellung in OpenLayers wird die Geometrie i. d. R. in ein Karten-CRS
 * (z. B. EPSG:25832) transformiert (siehe z. B. Layer-Komponenten).
 */
export interface MaengelListenView {
  /**
   * Eindeutige ID des Mangels/Reports.
   */
  id: number;

  /**
   * GeoJSON-Point mit der Lage des Mangels.
   */
  geometrie: PointGeojson;

  /**
   * Kategorie/Issue des Mangels (menschenlesbarer Text).
   *
   * Empfehlung: Wenn ihr das typisieren wollt, kann hier statt `string` auch der Union-Type
   * `Issue` aus `issue.model.ts` verwendet werden.
   */
  issue: string;

  /**
   * Optionale Beschreibung (Freitext).
   */
  beschreibung?: string;

  /**
   * Status des Reports (z. B. OFFEN/IN_BEARBEITUNG/ERLEDIGT).
   */
  status: string;
}
