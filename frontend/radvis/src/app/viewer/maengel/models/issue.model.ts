/**
 * Mögliche „Issue“-Kategorien für Mangelmeldungen (Frontend-Modell).
 *
 * ## Zweck
 * - Typ-sichere Repräsentation der vom Backend unterstützten Issue-Werte.
 * - Einheitliche Quelle für Dropdowns/Selects im UI ({@link ISSUE_VALUES}).
 *
 * ## Backend-Kompatibilität
 * Die String-Literale müssen **exakt** den Werten entsprechen, die das Backend über JSON
 * liefert bzw. akzeptiert (z. B. via `@JsonValue` / `@JsonCreator` am Backend-Enum).
 *
 * Hinweis: Wenn sich die Backend-Labels ändern, müssen diese Werte hier synchron angepasst werden.
 */

/**
 * Union-Type aller erlaubten Issue-Labels.
 *
 * Verwende diesen Typ in DTOs/Forms, um nur gültige Kategorien zuzulassen.
 */
export type Issue =
  | 'Schlagloch'
  | 'Schlechter Straßenbelag'
  | 'Bewuchs'
  | 'Fehlende Beschilderung'
  | 'Falsche Beschilderung'
  | 'Poller/Hindernis'
  | 'Unklare Markierung'
  | 'Unebenheiten/Bodenwellen'
  | 'Keine Kategorie';

/**
 * Alle verfügbaren Issue-Werte in einer festen Reihenfolge.
 *
 * Geeignet für UI-Elemente wie `mat-select`:
 *
 * @example
 * ```ts
 * // Template: *ngFor="let issue of ISSUE_VALUES"
 * // Value/Label sind identisch, da die Backend-Labels verwendet werden.
 * ```
 */
export const ISSUE_VALUES: Issue[] = [
  'Schlagloch',
  'Schlechter Straßenbelag',
  'Bewuchs',
  'Fehlende Beschilderung',
  'Falsche Beschilderung',
  'Poller/Hindernis',
  'Unklare Markierung',
  'Unebenheiten/Bodenwellen',
  'Keine Kategorie',
];
