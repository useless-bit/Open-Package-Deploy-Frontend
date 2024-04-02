import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard {
  constructor(
    router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise(async (resolve) => {
      // Force the user to log in if currently unauthenticated.
      if (!this.authenticated) {
        const currentUrl = location.href;

        await this.keycloak.login({
          redirectUri: currentUrl
        });
      }

      // Get the roles required from the route.
      const {roles: requiredRoles} = route.data;

      // Allow the user to proceed if no additional roles are required to access the route.
      if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
        resolve(true);
      }

      // Allow the user to proceed if all the required roles are present.
      resolve(requiredRoles.every((role: any) => this.roles.includes(role)));
    });
  }
}
