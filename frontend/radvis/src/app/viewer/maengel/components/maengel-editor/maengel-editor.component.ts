import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewerRoutingService } from 'src/app/viewer/viewer-shared/services/viewer-routing.service';
import { DiscardableComponent } from 'src/app/shared/services/discard.guard';
import { map } from 'rxjs/operators';
import { ReportBackendDTO } from '../../models/report-backend.dto';
import { MaengelService } from '../../services/maengel.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { Subscription } from 'rxjs';
import { MaengelRoutingService } from '../../services/maengel-routing.service';

/**
 * Editor-Komponente für einen einzelnen Mangel (Report).
 *
 * ## Datenquelle
 * Der zu bearbeitende Mangel wird über `ActivatedRoute.data` bereitgestellt
 * (typischerweise durch einen Resolver) und als {@link mangel$} exponiert.
 *
 * ## Navigation / Schließen
 * Beim Schließen wird zurück in den Viewer navigiert ({@link ViewerRoutingService#toViewer}).
 * Damit der Discard-Guard die Navigation zulässt, setzt {@link onClose} das Flag
 * {@link forceClose} und {@link canDiscard} liefert dann `true`.
 *
 * ## Statusänderung
 * Der Status kann über {@link onStatusChange} geändert werden. Nach erfolgreichem Speichern
 * wird der Filter neu initialisiert ({@link MaengelFilterService#reload}), damit Listen/Tabellen
 * die Änderung widerspiegeln.
 */
@Component({
  selector: 'rad-maengel-editor',
  templateUrl: './maengel-editor.component.html',
  styleUrls: ['./maengel-editor.component.scss'],
  standalone: false,
})
export class MaengelEditorComponent implements DiscardableComponent, OnDestroy {
  private subscriptions = new Subscription();

  /**
   * Observable des aktuell im Editor angezeigten Mangels.
   *
   * Hinweis: wird aus den Routen-Daten gemappt (Resolver-Pattern).
   */
  mangel$: Observable<ReportBackendDTO>;

  /**
   * `true`, wenn der aktuelle Nutzer als Ersteller des Reports erkannt wurde.
   * Wird über `route.snapshot.data['isCreator']` gesetzt.
   */
  isCreator = false;

  /**
   * Interner Schalter, um Navigation trotz Discard-Guard zu erzwingen.
   */
  private forceClose = false;

  /**
   * Erlaubte Statuswerte (Anzeige/Selektion im Template).
   *
   * Hinweis: Wenn die Werte serverseitig vorgegeben sind, wäre ein gemeinsames Enum/Mapping ideal.
   */
  reportStatuses = ['OFFEN', 'IN_BEARBEITUNG', 'ERLEDIGT'];

  constructor(
    private route: ActivatedRoute,
    private viewerRoutingService: ViewerRoutingService,
    private mangelService: MaengelService,
    private maengelFilterService: MaengelFilterService,
    private maengelRoutingService: MaengelRoutingService
  ) {
    this.mangel$ = this.route.data.pipe(map((data: Record<string, unknown>) => data['maengel'] as ReportBackendDTO));
    this.isCreator = (this.route.snapshot.data['isCreator'] as boolean | undefined) ?? false

    this.subscriptions.add(
      this.maengelRoutingService.forceCloseEditor$.subscribe(() => {
        this.forceClose = true;
      })
    );
  }

  /**
   * Tastaturkürzel: `Escape` schließt den Editor.
   */
  @HostListener('keydown.escape')
  onEscape(): void {
    this.onClose();
  }

  /**
   * Schließt den Editor und navigiert zurück in den Viewer.
   *
   * Setzt {@link forceClose}, damit {@link canDiscard} `true` liefert.
   */
  onClose(): void {
    this.forceClose = true;
    this.viewerRoutingService.toViewer();
  }

  /**
   * Callback des {@link DiscardableComponent}-Contracts.
   *
   * @returns `true`, wenn das Schließen erzwungen wurde, sonst `false`
   */
  canDiscard = (): boolean => {
    return this.forceClose;
  };

  /**
   * Speichert eine Statusänderung für den aktuellen Report.
   *
   * @param status Neuer Status
   * @param id Report-ID
   */
  onStatusChange(status: string, id: number): void {
    this.mangelService.updateStatus(id, { status }).subscribe({
      next: () => {
        // Logging kann später durch einen zentralen Notification-Service ersetzt werden.
        console.log('Status gespeichert');
        this.maengelFilterService.reload();
      },
      error: (err: unknown) => {
        console.error('PATCH Fehler', err);
        alert('Status konnte nicht gespeichert werden!');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

