import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';
import { PointGeojson } from '../../../shared/models/geojson-geometrie';

/**
 * Adapter-Funktionen für den Mängel-Bereich.
 *
 * Dieses File enthält reine Mapping-/Transformationslogik zwischen Backend-DTOs
 * und Frontend-View-Models. Die Funktionen sind bewusst *side-effect free* und
 * eignen sich damit gut für Unit-Tests und Wiederverwendung in Services/Components.
 */

/**
 * Mappt ein {@link ReportBackendDTO Backend-Report-DTO} auf eine {@link MaengelListenView}
 * für die Listen-/Tabellenansicht.
 *
 * ## Mapping-Details
 * - {@link MaengelListenView#beschreibung} wird aus {@link ReportBackendDTO#description} übernommen.
 * - Die Geometrie wird als GeoJSON-Point aufgebaut:
 *   - `type`: `"Point"`
 *   - `coordinates`: `[longitude, latitude]` (GeoJSON-Reihenfolge: **Lon, Lat**)
 *
 * @param report Backend-DTO eines Mangels/Reports
 * @returns View-Model für die Mängel-Liste
 *
 * @example
 * ```ts
 * const view = mapReportToMaengelList({
 *   id: 1,
 *   issue: 'Schlagloch',
 *   description: 'Großes Schlagloch auf dem Radweg',
 *   status: 'OPEN',
 *   longitude: 9.1829,
 *   latitude: 48.7758,
 * } as ReportBackendDTO);
 * ```
 */
export function mapReportToMaengelList(report: ReportBackendDTO): MaengelListenView {
  return {
    id: report.id,
    issue: report.issue,
    beschreibung: report.description,
    status: report.status,
    geometrie: {
      type: 'Point',
      coordinates: [report.longitude, report.latitude],
    } as PointGeojson,
  };
}

