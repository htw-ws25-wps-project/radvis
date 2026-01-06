import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'rad-maengel-tabelle',
  standalone: true,
  imports: [CommonModule, MatTableModule],
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
