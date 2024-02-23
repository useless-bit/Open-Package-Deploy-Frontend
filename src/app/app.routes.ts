import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from "./components/error/error-404/error-404.component";
import {keycloakGuard} from "./guard/keycloak.guard";
import {PlaceholderComponent} from "./components/placeholder/placeholder.component";
import {AgentOverviewComponent} from "./components/agent-overview/agent-overview.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: 'agent', pathMatch: 'full', component: AgentOverviewComponent, canActivate: [keycloakGuard]},
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
