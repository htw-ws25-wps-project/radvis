import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewerRoutingService } from 'src/app/viewer/viewer-shared/services/viewer-routing.service';
import { DiscardableComponent } from 'src/app/shared/services/discard.guard';
import {map} from "rxjs/operators";
import {ReportBackendDTO} from "../../models/report-backend.dto";

@Component({
  selector: 'rad-maengel-editor',
  templateUrl: './maengel-editor.component.html',
  styleUrls: ['./maengel-editor.component.scss'],
  standalone: false,
})
export class MaengelEditorComponent implements DiscardableComponent {
  mangel$: Observable<ReportBackendDTO>;
  isCreator = false;

  private forceClose = false;

  constructor(
    private route: ActivatedRoute,
    private viewerRoutingService: ViewerRoutingService
  ) {
    this.mangel$ = this.route.data.pipe(
      map(data => data['maengel'] as ReportBackendDTO)
    );

    this.isCreator = this.route.snapshot.data['isCreator'] ?? false;
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.onClose();
  }

  onClose(): void {
    this.forceClose = true;
    this.viewerRoutingService.toViewer();
  }

  canDiscard = (): boolean => {
    return this.forceClose;
  };
}
