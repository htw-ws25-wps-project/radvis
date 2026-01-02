import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAENGEL } from './models/maengel.infrastruktur';
import { InfrastrukturToken} from "../viewer-shared/models/infrastruktur";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: InfrastrukturToken,
      useValue: MAENGEL,
      multi: true
    }
  ]
})
export class MaengelModule { }
