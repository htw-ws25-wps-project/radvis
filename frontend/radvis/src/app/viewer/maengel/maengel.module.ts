import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ViewerSharedModule } from 'src/app/viewer/viewer-shared/viewer-shared.module';
import { InfrastrukturToken } from 'src/app/viewer/viewer-shared/models/infrastruktur';
import { MAENGEL } from './models/maengel.infrastruktur';

import { MaengelLayerComponent } from './components/maengel-layer/maengel-layer.component';
import { MaengelTabelleComponent } from './components/maengel-tabelle/maengel-tabelle.component';
import { MaengelEditorComponent } from './components/maengel-editor/maengel-editor.component';
import { MaengelFilterService } from './services/maengel-filter.service';

@NgModule({
  declarations: [
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
  ],
  providers: [
    {
      provide: InfrastrukturToken,
      useValue: MAENGEL,
      multi: true,
    },
    MaengelFilterService,
  ],
})
export class MaengelModule {}
