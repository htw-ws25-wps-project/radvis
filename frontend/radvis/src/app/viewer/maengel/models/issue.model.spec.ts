import { ISSUE_VALUES, Issue } from './issue.model';

describe('Issue model', () => {
  it('allows only defined Issue labels', () => {
    ISSUE_VALUES.forEach(value => {
      const issue: Issue = value;
      expect(issue).toBeDefined();
    });
  });

  it('contains no duplicate values', () => {
    expect(new Set(ISSUE_VALUES).size).toBe(ISSUE_VALUES.length);
  });
});
