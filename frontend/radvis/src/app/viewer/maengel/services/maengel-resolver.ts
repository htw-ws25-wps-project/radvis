import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MaengelService } from './maengel.service';
import { ReportBackendDTO } from '../models/report-backend.dto';

export const maengelResolver: ResolveFn<ReportBackendDTO> = route => {
  const idParam = route.paramMap.get('id');

  if (!idParam) {
    throw new Error('MaengelResolver: missing id');
  }

  const id = Number(idParam);

  return inject(MaengelService).getById(id);
};

