import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportBackendDTO } from '../../models/report-backend.dto';

@Component({
  selector: 'rad-maengel-editor',
  standalone: false,
  templateUrl: './maengel-editor.component.html',
  styleUrls: ['./maengel-editor.component.scss'],
})
export class MaengelEditorComponent {

  mangel$: Observable<ReportBackendDTO>;
  isCreator = false;

  constructor(private route: ActivatedRoute) {
    this.mangel$ = this.route.data.pipe(
      map(data => data['maengel'] as ReportBackendDTO)
    );


    this.isCreator = this.route.snapshot.data['isCreator'] ?? false;
  }

  onClose(): void {
    // igual que en otros editores
  }
}
