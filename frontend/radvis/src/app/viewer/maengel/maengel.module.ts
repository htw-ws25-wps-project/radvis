import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

import { ViewerSharedModule } from 'src/app/viewer/viewer-shared/viewer-shared.module';
import { InfrastrukturToken } from 'src/app/viewer/viewer-shared/models/infrastruktur';
import { AbstractInfrastrukturenRoutingService } from '../viewer-shared/services/abstract-infrastrukturen-routing.service';

import { MAENGEL } from './models/maengel.infrastruktur';

import { MaengelToolComponent } from './components/maengel-tool/maengel-tool.component';
import { MaengelLayerComponent } from './components/maengel-layer/maengel-layer.component';
import { MaengelTabelleComponent } from './components/maengel-tabelle/maengel-tabelle.component';
import { MaengelEditorComponent } from './components/maengel-editor/maengel-editor.component';

import { MaengelFilterService } from './services/maengel-filter.service';
import { MaengelRoutingService } from './services/maengel-routing.service';

@NgModule({
  declarations: [
    MaengelToolComponent,
    MaengelLayerComponent,
    MaengelTabelleComponent,
    MaengelEditorComponent,
  ],
  imports: [
    CommonModule,
    ViewerSharedModule,
    RouterModule,

    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatDividerModule,
  ],
  exports: [MaengelLayerComponent, MaengelTabelleComponent],
  providers: [
    /**
     * Registriert „Mängel“ als verfügbare Infrastruktur-Art im Viewer.
     *
     * `multi: true`, damit mehrere Infrastruktur-Arten parallel bereitgestellt werden können.
     */
    {
      provide: InfrastrukturToken,
      useValue: MAENGEL,
      multi: true,
    },
    /**
     * Registriert den zugehörigen Routing-Service für die Infrastruktur-Art „Mängel“.
     *
     * `multi: true`, damit der Viewer mehrere Routing-Services (je Infrastruktur) sammeln kann.
     */
    {
      provide: AbstractInfrastrukturenRoutingService,
      useExisting: MaengelRoutingService,
      multi: true,
    },
    /**
     * Filter-/Daten-Service für Listen/Tabellen im Mängel-Kontext.
     */
    MaengelFilterService,
  ],
})
/**
 * Feature-Modul für den Viewer-Bereich „Mängel“.
 *
 * ## Enthält
 * - Tool-Container ({@link MaengelToolComponent})
 * - OpenLayers-Layer ({@link MaengelLayerComponent})
 * - Tabelle ({@link MaengelTabelleComponent})
 * - Editor ({@link MaengelEditorComponent})
 *
 * ## Integration in den Viewer
 * Über {@link InfrastrukturToken} wird {@link MAENGEL} im System registriert.
 * Zusätzlich wird {@link MaengelRoutingService} als {@link AbstractInfrastrukturenRoutingService}
 * bereitgestellt, damit der Viewer die Child-Routen/Navigation für „Mängel“ kennt.
 */
export class MaengelModule {}
