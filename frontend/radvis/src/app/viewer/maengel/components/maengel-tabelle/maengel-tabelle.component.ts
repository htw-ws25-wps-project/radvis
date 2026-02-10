import { ChangeDetectionStrategy, Component, forwardRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractInfrastrukturenFilterService } from 'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';
import { SpaltenDefinition } from 'src/app/viewer/viewer-shared/models/spalten-definition';
import { MaengelRoutingService } from '../../services/maengel-routing.service';
import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MaengelListenView } from '../../models/maengel-listen-view';

@Component({
  selector: 'rad-maengel-tabelle',
  templateUrl: './maengel-tabelle.component.html',
  styleUrls: ['./maengel-tabelle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    /**
     * Stellt sicher, dass generische Tabellen-/Filter-Komponenten, die gegen
     * {@link AbstractInfrastrukturenFilterService} injizieren, hier den
     * {@link MaengelFilterService} erhalten.
     */
    {
      provide: AbstractInfrastrukturenFilterService,
      useExisting: forwardRef(() => MaengelFilterService),
    },
  ],
  standalone: false,
})
/**
 * Tabellen-Komponente für die Mängel-Liste.
 *
 * ## Verantwortung
 * - Zeigt die vom {@link MaengelFilterService} gefilterte Liste an ({@link data$}).
 * - Stellt die Spaltendefinition für die Tabelle bereit ({@link spaltenDefinition}).
 * - Reagiert auf Filter-Änderungen und liefert die aktuell sichtbaren Spalten ({@link filteredSpalten$}).
 * - Navigiert bei Auswahl eines Eintrags in den Mängel-Editor ({@link onSelectRecord}).
 *
 * ## Auswahl / Selektion
 * Die aktuell selektierte Mängel-ID kommt aus dem Routing ({@link selectedMaengelId$}) und
 * kann im Template z. B. zur Hervorhebung verwendet werden.
 *
 * ## Darstellung
 * {@link getElementValue} kapselt die Anzeige-Logik einzelner Zellen, u. a. das Kürzen langer
 * Beschreibungen.
 */
export class MaengelTabelleComponent {
  /**
   * MatSort-Instanz aus der Material-Tabelle.
   *
   * Hinweis: wird im aktuellen Code nicht weiter verwendet, ist aber häufig für `matSort`
   * im Template erforderlich.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Gefilterte Daten (Listeneinträge) aus dem {@link MaengelFilterService}.
   */
  data$: Observable<MaengelListenView[]>;

  /**
   * ID des aktuell über das Routing selektierten Mangels (oder `null`).
   */
  selectedMaengelId$: Observable<number | null>;

  /**
   * Spaltendefinitionen der Tabelle (Anzeige/Labeling).
   */
  spaltenDefinition: SpaltenDefinition[] = [
    { name: 'issue', displayName: 'Issue' },
    { name: 'beschreibung', displayName: 'Beschreibung' },
    { name: 'status', displayName: 'Status' },
  ];

  /**
   * Liste der Feldnamen, die aktuell (durch den Filter) als Spalten angezeigt werden sollen.
   */
  filteredSpalten$: Observable<string[]>;

  /**
   * `true`, wenn die Tabelle in einer kleinen Viewport-Variante gerendert werden soll.
   * Wird über {@link onChangeBreakpointState} gesetzt.
   */
  isSmallViewport = false;

  constructor(
    /**
     * Öffentlich, damit das Template direkt auf Filter-State/Actions zugreifen kann.
     */
    public maengelFilterService: MaengelFilterService,
    private maengelRoutingService: MaengelRoutingService
  ) {
    this.data$ = this.maengelFilterService.filteredList$;
    this.selectedMaengelId$ = this.maengelRoutingService.selectedInfrastrukturId$;

    this.filteredSpalten$ = this.maengelFilterService.filter$.pipe(
      map(filteredFields => filteredFields.map(f => f.field))
    );
  }

  /**
   * Liefert den anzuzeigenden Zellwert für eine Spalte.
   *
   * Fachliche Sonderlogik:
   * - `beschreibung` wird ab einer gewissen Länge gekürzt, um die Tabelle kompakt zu halten.
   *
   * @param item Datensatz (Tabellenzeile)
   * @param key Spalten-Key (Feldname)
   * @returns anzuzeigender Wert (String oder String-Liste)
   */
  getElementValue: (item: MaengelListenView, key: string) => string | string[] = (item, key) => {
    const value = (item as any)[key];

    if (key === 'beschreibung' && typeof value === 'string' && value.length > 50) {
      return value.slice(0, 47) + '...';
    }

    return value;
  };

  /**
   * Callback für Breakpoint/Responsive-Änderungen.
   *
   * @param isSmall `true` wenn kleiner Viewport aktiv ist
   */
  onChangeBreakpointState(isSmall: boolean): void {
    this.isSmallViewport = isSmall;
  }

  /**
   * Setzt den Filter auf den Initialzustand zurück.
   */
  onFilterReset(): void {
    this.maengelFilterService.reset();
  }

  /**
   * Navigiert in den Editor für den gewählten Mangel.
   *
   * @param id ID des ausgewählten Datensatzes
   */

  onSelectRecord(id: number): void {
    this.maengelRoutingService.toInfrastrukturEditorFromTable(id);
  }
}
