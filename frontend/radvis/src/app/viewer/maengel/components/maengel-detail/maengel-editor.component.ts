import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'rad-maengel-detail',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon
  ],
  templateUrl: './maengel-editor.component.html',
  styleUrl: './maengel-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaengelEditorComponent {

  mangel$ = this.route.data.pipe(
    map(data => data['mangel'])
  );

  constructor(private route: ActivatedRoute) {}

  onClose(): void {
  }
}
