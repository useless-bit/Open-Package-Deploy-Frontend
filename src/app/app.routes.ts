import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from "./components/error/error-404/error-404.component";
import {keycloakGuard} from "./guard/keycloak.guard";
import {PlaceholderComponent} from "./components/placeholder/placeholder.component";
import {AgentOverviewComponent} from "./components/agent/agent-overview/agent-overview.component";
import {PackageOverviewComponent} from "./components/package/package-overview/package-overview.component";
import {DeploymentOverviewComponent} from "./components/deployment/deployment-overview/deployment-overview.component";
import {SettingsOverviewComponent} from "./components/settings/settings-overview/settings-overview.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: PlaceholderComponent, canActivate: [keycloakGuard]},
  {path: 'agent', pathMatch: 'full', component: AgentOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'package', pathMatch: 'full', component: PackageOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'deployment', pathMatch: 'full', component: DeploymentOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'settings', pathMatch: 'full', component: SettingsOverviewComponent, canActivate: [keycloakGuard]},
  {path: '**', pathMatch: 'full', component: Error404Component, canActivate: [keycloakGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
