export const MOCK_ISSUES = [
  'RADWEG_SCHAEDEN',
  'BELEUCHTUNG',
  'BESCHILDERUNG',
  'SONSTIGES'
];

export const MOCK_ISSUE_LABELS = [
  { code: 'RADWEG_SCHAEDEN', label: 'Radweg beschädigt' },
  { code: 'BELEUCHTUNG', label: 'Beleuchtung defekt' },
  { code: 'BESCHILDERUNG', label: 'Beschilderung fehlt' },
  { code: 'SONSTIGES', label: 'Sonstiges' }
];

export const MOCK_REPORTS = [
  {
    id: 1,
    issue: 'RADWEG_SCHAEDEN',
    description: 'Großes Loch im Radweg',
    latitude: 52.52,
    longitude: 13.405,
    creationDate: '2026-01-01T12:00:00'
  },
  {
    id: 2,
    issue: 'BELEUCHTUNG',
    description: 'Lampe kaputt',
    latitude: 52.51,
    longitude: 13.4,
    creationDate: '2026-01-02T09:30:00'
  }
];
