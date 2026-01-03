import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'rad-maengel-tabelle',
  standalone: true,
  imports: [],
  templateUrl: './maengel-tabelle.component.html',
  styleUrl: './maengel-tabelle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaengelTabelleComponent {
  @Input()
  maengel: any[] = [];

  /**
   * Optionaler Display-Helper.
   * Kein Mapping, keine Transformation.
   */
  getIssueLabel(issue: string): string {
    return issue;
  }
}
