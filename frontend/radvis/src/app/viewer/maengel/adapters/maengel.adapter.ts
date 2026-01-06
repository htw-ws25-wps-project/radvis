import { MaengelListenView } from '../models/maengel-listen-view';
import { ReportBackendDTO } from '../models/report-backend.dto';

export function mapReportToMaengelList(
  report: ReportBackendDTO
): MaengelListenView {
  return {
    id: report.id,
    issue: report.issue,
    beschreibung: report.description,
    latitude: report.latitude,
    longitude: report.longitude,
  };
}
