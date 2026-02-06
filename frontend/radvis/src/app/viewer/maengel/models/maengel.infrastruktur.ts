import { Infrastruktur } from 'src/app/viewer/viewer-shared/models/infrastruktur';

/**
 * Infrastruktur-Definition für den Viewer-Bereich „Mängel“.
 *
 * Diese Konstante wird als zentraler Identifikator für den Mängel-Kontext verwendet, u. a. für:
 * - Routing (über {@link Infrastruktur#pathElement})
 * - Icon-Auswahl im UI (über {@link Infrastruktur#iconFileName})
 * - Gruppierung im Viewer-Menü (über {@link Infrastruktur#gruppe})
 * - Styling/Layer-Logik, die sich auf eine Infrastruktur bezieht (z. B. in OpenLayers-Layern)
 *
 * Hinweis: Für „Mängel“ ist keine Linienfarbe gesetzt, da die Geometrien typischerweise als Punkte
 * gerendert werden (statt als Linien).
 */
export const MAENGEL = new Infrastruktur(
  'Mängel',
  'icon-maengel.svg',
  'maengel',
  undefined,
  'Analyse'
);
