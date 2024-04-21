import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import {provideRouter, Router, withDisabledInitialNavigation, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {VariableService} from "./service/variable/variable.service";
import {ApplicationLoadedService} from "./service/application-loaded/application-loaded.service";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {HIGHLIGHT_OPTIONS} from "ngx-highlightjs";

function initializeKeycloak(keycloak: KeycloakService, vs: VariableService): Promise<void> {
  return new Promise((resolve, reject) => {
    keycloak.init({
      config: {
        realm: vs.keycloakRealm,
        url: vs.keycloakUrl,
        clientId: vs.keycloakClientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    }).then(() => resolve()).catch((error) => reject(new Error(error)));
  });
}

const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};


export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes, withDisabledInitialNavigation(), withHashLocation()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakBearerInterceptorProvider,
    MatTableDataSource,
    ApplicationLoadedService,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: (variableService: VariableService, keycloakService: KeycloakService, router: Router, applicationLoadedService: ApplicationLoadedService, location: Location) => {
        return () => {
          variableService.loadVariables().then(() => {
            initializeKeycloak(keycloakService, variableService).then(() => {
              // Navigate back to the original URL
              router.navigateByUrl(location.path(true)).then(() => {
              });
              applicationLoadedService.emitInitFinished(true);
            });
          });
        };
      },
      deps: [VariableService, KeycloakService, Router, ApplicationLoadedService, Location],
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {fullLibraryLoader: () => import('highlight.js')}
    }
  ]
};
