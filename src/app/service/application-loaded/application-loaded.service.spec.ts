import {TestBed} from '@angular/core/testing';

import {ApplicationLoadedService} from './application-loaded.service';

describe('ApplicationLoadedService', () => {
  let service: ApplicationLoadedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationLoadedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
