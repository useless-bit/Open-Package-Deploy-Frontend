import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {KeycloakGuard} from './keycloak-guard.service';

describe('keycloakGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => KeycloakGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
