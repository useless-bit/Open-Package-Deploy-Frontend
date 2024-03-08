import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import {
  provideRouter,
  Router,
  RouteReuseStrategy,
  withDisabledInitialNavigation,
  withHashLocation
} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {VariableService} from "./service/variable/variable.service";
import {ApplicationLoadedService} from "./service/application-loaded/application-loaded.service";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {Location} from "@angular/common";
import {CustomRouteReuseStrategy} from "./strategy/CustomRouteReuseStrategy";
import {MatTableDataSource} from "@angular/material/table";

async function initializeKeycloak(keycloak: KeycloakService, vs: VariableService) {
  return new Promise<void>(async (resolve) => {
    await keycloak.init({
      config: {
        realm: vs.keycloakRealm,
        url: vs.keycloakUrl,
        clientId: vs.keycloakClientId
      },
      initOptions: {
        onLoad: 'check-sso',
      }, enableBearerInterceptor: true,
      // Prefix for the Bearer token
      bearerPrefix: 'Bearer',

    });
    resolve();
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
      useFactory: (variableService: VariableService, keycloakService: KeycloakService, router: Router, sharedService: ApplicationLoadedService, location: Location) => {
        return () => new Promise<void>((resolve) => {
          const currentUrl = location.path(true);
          let separator: string;
          if (currentUrl.substring(0, 6) == "state=") {
            separator = "state=";
          } else {
            separator = "&state=";
          }

          variableService.loadVariables().then(() => {
            initializeKeycloak(keycloakService, variableService).then(() => {
              // Navigate back to the original URL while removing url parameters (from Keycloak)
              router.navigateByUrl(currentUrl.split(separator)[0]).then(() => {
              });
              sharedService.emitInitFinished(true);
            });
          });
          resolve();
        });
      },
      deps: [VariableService, KeycloakService, Router, ApplicationLoadedService, Location],
      multi: true
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ]
};
