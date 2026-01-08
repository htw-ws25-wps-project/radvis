import GeoJSON from "ol/format/GeoJSON";
import {PointGeojson} from "../../../shared/models/geojson-geometrie";

export interface MaengelListenView {
  id: number;
  geometrie: PointGeojson;
  issue: string;
  beschreibung?: string;
}
