import {mapReportToMaengelList} from "./maengel.adapter";
import {ReportBackendDTO} from "../models/report-backend.dto";

it('maps ReportBackendDTO to MaengelListenView with correct coordinates order', () => {
  const dto = {
    id: 1,
    issue: 'Schlagloch',
    latitude: 52.52,
    longitude: 13.405,
  } as ReportBackendDTO;


  const result = mapReportToMaengelList(dto);

  expect(result.geometrie.coordinates).toEqual([13.405, 52.52]);
});
