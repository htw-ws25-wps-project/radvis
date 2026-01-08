import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';
import {PointGeojson} from "../../../shared/models/geojson-geometrie";

export function mapReportToMaengelList(
  report: ReportBackendDTO
): MaengelListenView {
  return {
    id: report.id,
    issue: report.issue,
    beschreibung: report.description,
    "geometrie": {
      "type": "Point",
      "coordinates": [
        report.latitude, report.longitude
      ]
    },

  };
}
