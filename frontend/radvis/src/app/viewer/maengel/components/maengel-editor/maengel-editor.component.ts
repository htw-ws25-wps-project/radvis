import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MaengelService } from '../../services/maengel.service';
import { MaengelListenView } from '../../models/maengel-listen-view';

@Component({
  selector: 'rad-maengel-detail',
  templateUrl: './maengel-editor.component.html',
  styleUrls: ['./maengel-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MaengelEditorComponent {

  mangel$: Observable<MaengelListenView>;

  constructor(
    private route: ActivatedRoute,
    private maengelService: MaengelService
  ) {
    this.mangel$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.maengelService.getById(id))
    );
  }

  onClose(): void {
    history.back();
  }
}
