/*
 * Copyright (c) 2023 WPS - Workplace Solutions GmbH
 *
 * Licensed under the EUPL, Version 1.2 or as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
 *
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and limitations under the Licence.
 */

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ABSTELLANLAGEN } from 'src/app/viewer/abstellanlage/models/abstellanlage.infrastruktur';
import { ANPASSUNGSWUNSCH } from 'src/app/viewer/anpassungswunsch/models/anpassungswunsch.infrastruktur';
import { BARRIEREN } from 'src/app/viewer/barriere/models/barriere.infrastruktur';
import { FAHRRADROUTE } from 'src/app/viewer/fahrradroute/models/fahrradroute.infrastruktur';
import { FAHRRADZAEHLSTELLE } from 'src/app/viewer/fahrradzaehlstelle/models/fahrradzaehlstelle.infrastruktur';
import { FURTEN_KREUZUNGEN } from 'src/app/viewer/furten-kreuzungen/models/furten-kreuzungen.infrastruktur';
import { IMPORTPROTOKOLLE } from 'src/app/viewer/importprotokolle/models/importprotokoll.infrastruktur';
import { LEIHSTATIONEN } from 'src/app/viewer/leihstation/models/leihstation.infrastruktur';
import { MASSNAHMEN } from 'src/app/viewer/massnahme/models/massnahme.infrastruktur';
import { SERVICESTATIONEN } from 'src/app/viewer/servicestation/models/servicestation.infrastruktur';
import { Infrastruktur } from 'src/app/viewer/viewer-shared/models/infrastruktur';
import { InfrastrukturenSelektionService } from 'src/app/viewer/viewer-shared/services/infrastrukturen-selektion.service';
import { WEGWEISENDE_BESCHILDERUNG } from 'src/app/viewer/wegweisende-beschilderung/models/wegweisende-beschilderung.infrastruktur';
import {MAENGEL} from "../../maengel/models/maengel.infrastruktur";

@Component({
  selector: 'rad-infrastrukturen-tabellen',
  templateUrl: './infrastrukturen-tabellen.component.html',
  styleUrls: ['./infrastrukturen-tabellen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('easeInOut', [
      state(
        'in',
        style({
          height: '0px',
        })
      ),
      state(
        'out',
        style({
          height: '*',
        })
      ),
      transition('in <=> out', [animate('0.25s')]),
    ]),
  ],
  standalone: false,
})
/**
 * Zeigt Detail-Tabellen zu den aktuell selektierten Infrastrukturen im Viewer an.
 *
 * ## Zweck
 * Diese Komponente visualisiert die Auswahl aus {@link InfrastrukturenSelektionService} in Form
 * einer Tab-/Tabellen-Ansicht. Je nach Infrastruktur-Typ werden unterschiedliche Tabellen/Views
 * im Template gerendert.
 *
 * ## Features
 * - Reagiert auf Änderungen der Selektion (Observable-Stream).
 * - Verwaltet eine {@link activeInfrastruktur} als aktuell aktives Tab-Element.
 * - Kann minimiert werden ({@link minimized}) und optional als Dialog verwendet werden ({@link asDialog}).
 * - Bietet ein Output-Event zum Umschalten in eine Vollbildansicht ({@link showFullscreen}).
 * - Tastenkürzel: `Ctrl + Alt + Shift + T` fokussiert den ersten Tab (A11y/Power-User).
 *
 * ## Change Detection
 * Verwendet {@link ChangeDetectionStrategy.OnPush}. Da die Komponente intern (im `subscribe`)
 * den {@link activeInfrastruktur}-State setzt, wird explizit `markForCheck()` aufgerufen.
 *
 * @see InfrastrukturenSelektionService
 */
export class InfrastrukturenTabellenComponent {
  /**
   * Container-Element der Tabs (aus dem Template via Template-Ref `#tabContainer`).
   *
   * Wird genutzt, um per Tastenkürzel den ersten Tab zu fokussieren.
   */
  @ViewChild('tabContainer', { read: ElementRef })
  tabContainer: ElementRef | undefined;

  /**
   * Wird ausgelöst, wenn der Nutzer in die Vollbildansicht wechseln möchte.
   */
  @Output()
  showFullscreen = new EventEmitter<void>();

  /**
   * Wenn `true`, wird die Komponente im Dialog-Kontext dargestellt.
   *
   * (Das konkrete Layout/Verhalten wird im Template/SCSS umgesetzt.)
   */
  @Input()
  asDialog = false;

  /**
   * Stream der aktuell selektierten Infrastrukturen.
   *
   * Typischerweise im Template via `async`-Pipe genutzt.
   */
  selektierteInfrastrukturen$: Observable<Infrastruktur[]>;

  /**
   * Infrastruktur-Konstanten für Typprüfungen/Zuordnung im Template.
   */
  readonly FAHRRADROUTE = FAHRRADROUTE;
  readonly MASSNAHMEN = MASSNAHMEN;
  readonly IMPORTPROTOKOLLE = IMPORTPROTOKOLLE;
  readonly ANPASSUNGSWUNSCH = ANPASSUNGSWUNSCH;
  readonly FURTEN_KREUZUNGEN = FURTEN_KREUZUNGEN;
  readonly BARRIEREN = BARRIEREN;
  readonly WEGWEISENDE_BESCHILDERUNG = WEGWEISENDE_BESCHILDERUNG;
  readonly ABSTELLANLAGEN = ABSTELLANLAGEN;
  readonly SERVICESTATIONEN = SERVICESTATIONEN;
  readonly LEIHSTATIONEN = LEIHSTATIONEN;
  readonly FAHRRADZAEHLSTELLE = FAHRRADZAEHLSTELLE;

  /**
   * Wenn `true`, ist die Tabellenansicht minimiert (eingeklappt).
   */
  minimized = false;

  /**
   * Die aktuell aktive Infrastruktur (entspricht dem aktiven Tab).
   *
   * Wird automatisch aktualisiert, wenn
   * - die aktive Infrastruktur nicht mehr in der Selektion enthalten ist oder
   * - noch keine aktive Infrastruktur gesetzt ist.
   */
  activeInfrastruktur: Infrastruktur | null = null;

  /**
   * @param infrastrukturenSelektionService Liefert/verwaltet die Selektion der Infrastrukturen
   * @param changeDetector Wird genutzt, um bei OnPush nach internen State-Änderungen eine Prüfung anzustoßen
   */
  constructor(
    private infrastrukturenSelektionService: InfrastrukturenSelektionService,
    changeDetector: ChangeDetectorRef
  ) {
    this.selektierteInfrastrukturen$ = this.infrastrukturenSelektionService.selektierteInfrastrukturen$;
    this.selektierteInfrastrukturen$.subscribe(infrastrukturen => {
      if (
        (this.activeInfrastruktur && !infrastrukturen.includes(this.activeInfrastruktur)) ||
        !Boolean(this.activeInfrastruktur)
      ) {
        this.activeInfrastruktur = infrastrukturen[0] ?? null;
        changeDetector.markForCheck();
      }
    });
  }

  /**
   * Tastenkürzel: `Ctrl + Alt + Shift + T`.
   *
   * Fokussiert (falls vorhanden) den ersten Tab innerhalb des Tab-Containers.
   * Unterstützt schnelle Tastaturbedienung und Barrierefreiheit.
   */
  @HostListener('document:keydown.control.alt.shift.t')
  onShortcut(): void {
    this.tabContainer?.nativeElement.querySelector('div[role="tab"]')?.focus();
  }

  /**
   * Triggert das {@link showFullscreen}-Event.
   */
  onFullScreen(): void {
    this.showFullscreen.next();
  }

  /**
   * Klappt die Tabellenansicht ein/aus.
   */
  onToggleMinimization(): void {
    this.minimized = !this.minimized;
  }

  /**
   * Infrastruktur-Konstante für „Mängel“ (nur im Template benötigt).
   */
  protected readonly MAENGEL = MAENGEL;
}
