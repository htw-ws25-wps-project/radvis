import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewerRoutingService } from 'src/app/viewer/viewer-shared/services/viewer-routing.service';
import { DiscardableComponent } from 'src/app/shared/services/discard.guard';
import {map} from "rxjs/operators";
import {ReportBackendDTO} from "../../models/report-backend.dto";
import { MaengelService } from '../../services/maengel.service';
import {MaengelFilterService} from "../../services/maengel-filter.service";

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

  reportStatuses = ['OFFEN', 'IN_BEARBEITUNG', 'ERLEDIGT'];

  constructor(
    private route: ActivatedRoute,
    private viewerRoutingService: ViewerRoutingService,
    private mangelService: MaengelService,
    private maengelFilterService: MaengelFilterService
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
  }


  onStatusChange(status: string, id: number): void {
    this.mangelService.updateStatus(id, { status }).subscribe({
      next: () => {
        console.log('Status gespeichert');
        this.maengelFilterService.reload();
      },
      error: (err) => {
        console.error(' PATCH Fehler', err);
        alert('Status konnte nicht gespeichert werden!');
      }
    });
  }
}

