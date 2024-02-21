import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
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
import {KeycloakService} from "keycloak-angular";
import {provideHttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {CustomRouteReuseStrategy} from "./strategy/CustomRouteReuseStrategy";

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
      }
    });
    resolve();
  });
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes, withDisabledInitialNavigation(), withHashLocation()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
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
          console.log(currentUrl)
          console.log(separator)

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
