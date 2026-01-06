import {ChangeDetectionStrategy, Component, forwardRef, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractInfrastrukturenFilterService } from
    'src/app/viewer/viewer-shared/services/abstract-infrastrukturen-filter.service';
import { SpaltenDefinition } from
    'src/app/viewer/viewer-shared/models/spalten-definition';
import { MaengelRoutingService } from '../../services/maengel-routing.service';

import { MaengelFilterService } from '../../services/maengel-filter.service';
import { MaengelListenView } from '../../models/maengel-listen-view';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'rad-maengel-tabelle',
  templateUrl: './maengel-tabelle.component.html',
  styleUrls: ['./maengel-tabelle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractInfrastrukturenFilterService,
      useExisting: forwardRef(() => MaengelFilterService),
    },
  ],
  standalone: false,
})
export class MaengelTabelleComponent {
  @ViewChild(MatSort) sort!: MatSort;

  /** Daten aus dem FilterService */
  data$: Observable<MaengelListenView[]>;
  selectedMaengelId$: Observable<number | null>;

  /** Spalten wie bei WPS-Tabellen */
  spaltenDefinition: SpaltenDefinition[] = [
    {name: 'issue', displayName: 'Issue'},
    {name: 'beschreibung', displayName: 'Beschreibung'},
  ];

  /** Gefilterte Spalten */
  filteredSpalten$: Observable<string[]>;


  constructor(
    public maengelFilterService: MaengelFilterService,
    private maengelRoutingService: MaengelRoutingService
  ) {
    console.log('[MAENGEL TABLE] CONSTRUCTOR');
    this.data$ = this.maengelFilterService.filteredList$;
    this.selectedMaengelId$ = this.maengelRoutingService.selectedInfrastrukturId$;

    this.filteredSpalten$ = this.maengelFilterService.filter$.pipe(
      map(filteredFields => filteredFields.map(f => f.field))
    );
    this.data$.subscribe(d =>
      console.log('[MAENGEL TABLE] data$', d)
    );


    console.log('MaengelTabelleComponent INIT');

  }

  /** 1:1 wie Anpassungswunsch */
  getElementValue: (item: MaengelListenView, key: string) => string | string[] = (
    item,
    key
  ) => {
    const value = (item as any)[key];

    if (key === 'beschreibung' && typeof value === 'string' && value.length > 50) {
      return value.slice(0, 47) + '...';
    }

    return value;
  };
  isSmallViewport = false;

  onChangeBreakpointState(isSmall: boolean): void {
    this.isSmallViewport = isSmall;
  }

  onFilterReset(): void {
    this.maengelFilterService.reset();
  }

  onSelectRecord(id: number): void {
    this.maengelRoutingService.toInfrastrukturEditor(id);
  }


}
