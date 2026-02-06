import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MaengelService } from './maengel.service';
import { ReportBackendDTO } from '../models/report-backend.dto';

/**
 * Route-Resolver für einen einzelnen Mangel (Report).
 *
 * Lädt beim Navigieren auf die Detail-/Editor-Route den Report aus dem Backend und stellt ihn
 * in `ActivatedRoute.data` unter dem konfigurierten Schlüssel bereit (z. B. `data['maengel']`).
 *
 * ## Erwartete Route-Parameter
 * - `id`: numerische Report-ID (Pfadparameter)
 *
 * ## Datenquelle
 * Nutzt {@link MaengelService#getById} und liefert ein {@link ReportBackendDTO}.
 *
 * @throws Error wenn der Route-Parameter `id` fehlt
 */
export const maengelResolver: ResolveFn<ReportBackendDTO> = route => {
  const idParam = route.paramMap.get('id');

  if (!idParam) {
    throw new Error('MaengelResolver: missing id');
  }

  const id = Number(idParam);

  return inject(MaengelService).getById(id);
};

