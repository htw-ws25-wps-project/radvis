import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ViewerSharedModule } from 'src/app/viewer/viewer-shared/viewer-shared.module';
import { InfrastrukturToken } from 'src/app/viewer/viewer-shared/models/infrastruktur';
import { MAENGEL } from './models/maengel.infrastruktur';

import { MaengelToolComponent } from './components/maengel-tool/maengel-tool.component';
import { MaengelLayerComponent } from './components/maengel-layer/maengel-layer.component';
import { MaengelTabelleComponent } from './components/maengel-tabelle/maengel-tabelle.component';
import { MaengelEditorComponent } from './components/maengel-editor/maengel-editor.component';
import { MaengelFilterService } from './services/maengel-filter.service';
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {
  AbstractInfrastrukturenRoutingService
} from "../viewer-shared/services/abstract-infrastrukturen-routing.service";
import {MaengelRoutingService} from "./services/maengel-routing.service";

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
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    MaengelLayerComponent,
    MaengelTabelleComponent,
  ],
  providers: [
    {
      provide: InfrastrukturToken,
      useValue: MAENGEL,
      multi: true,
    },
    {
      provide: AbstractInfrastrukturenRoutingService,
      useExisting: MaengelRoutingService,
      multi: true,
    },
    MaengelFilterService,
  ],
})
export class MaengelModule {}
