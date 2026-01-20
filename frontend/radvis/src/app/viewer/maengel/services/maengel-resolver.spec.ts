import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  convertToParamMap
} from '@angular/router';
import { of } from 'rxjs';

import { maengelResolver } from './maengel-resolver';
import { MaengelService } from './maengel.service';

describe('maengelResolver (working)', () => {
  let maengelServiceSpy: jasmine.SpyObj<MaengelService>;

  beforeEach(() => {
    maengelServiceSpy = jasmine.createSpyObj<MaengelService>('MaengelService', ['getById']);
    maengelServiceSpy.getById.and.returnValue(of({} as any));

    TestBed.configureTestingModule({
      providers: [{ provide: MaengelService, useValue: maengelServiceSpy }],
    });
  });

  it('calls MaengelService.getById with id from route', () => {
    const route = {
      paramMap: convertToParamMap({ id: '7' }),
    } as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;

    TestBed.runInInjectionContext(() => {
      maengelResolver(route, state);
    });

    expect(maengelServiceSpy.getById).toHaveBeenCalledOnceWith(7);
  });

  it('throws error if id is missing', () => {
    const route = {
      paramMap: convertToParamMap({}),
    } as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;

    expect(() =>
      TestBed.runInInjectionContext(() => {
        maengelResolver(route, state);
      })
    ).toThrowError('MaengelResolver: missing id');
  });
});
