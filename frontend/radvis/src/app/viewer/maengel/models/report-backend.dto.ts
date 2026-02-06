/**
 * Backend-DTO für eine Mangelmeldung (Report).
 *
 * Dieses Interface beschreibt die JSON-Repräsentation, wie sie vom Backend geliefert bzw.
 * vom Frontend an das Backend gesendet wird.
 *
 * ## Abgrenzung
 * - {@link ReportBackendDTO} ist **transportorientiert** (Backend-Vertrag).
 * - Für Listen-/Tabellenansichten wird typischerweise in ein UI-View-Model gemappt
 *   (z. B. {@code MaengelListenView}), inklusive GeoJSON-Geometrie.
 *
 * ## Koordinaten
 * {@link latitude}/{@link longitude} werden als WGS84 (EPSG:4326) erwartet.
 * Wenn GeoJSON verwendet wird, ist die Koordinatenreihenfolge dort üblicherweise `[longitude, latitude]`.
 */
export interface ReportBackendDTO {
  /**
   * Eindeutige ID des Reports.
   */
  id: number;

  /**
   * Kategorie/Issue des Reports.
   *
   * Hinweis: Das Backend kann hier Enum-Labels liefern. Optional kann das im Frontend
   * stärker typisiert werden (z. B. über den Union-Type `Issue`).
   */
  issue: string;

  /**
   * Optionale Beschreibung (Freitext).
   */
  description?: string;

  /**
   * Breitengrad (WGS84 / EPSG:4326).
   */
  latitude: number;

  /**
   * Längengrad (WGS84 / EPSG:4326).
   */
  longitude: number;

  /**
   * Status des Reports.
   */
  status: string;

  /**
   * Liste von URLs zu Fotos, die dem Report zugeordnet sind.
   */
  photoUrls: string[];
}
