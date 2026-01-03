// Backend-konforme Issue-Werte (Labels via @JsonValue / @JsonCreator)

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
