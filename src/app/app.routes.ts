import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {TestContentComponent} from "./components/test-content/test-content.component";
import {Error404Component} from "./components/error/error-404/error-404.component";
import {keycloakGuard} from "./guard/keycloak.guard";
import {PlaceholderComponent} from "./components/placeholder/placeholder.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: TestContentComponent, canActivate: [keycloakGuard]},
  {path: 'agent', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: 'package', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: 'deployment', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: 'setting', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: '**', pathMatch: 'full', component: Error404Component, canActivate: [keycloakGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
