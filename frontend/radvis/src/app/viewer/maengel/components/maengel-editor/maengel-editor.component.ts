import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'rad-maengel-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
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
