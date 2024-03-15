import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from "./components/error/error-404/error-404.component";
import {keycloakGuard} from "./guard/keycloak.guard";
import {AgentOverviewComponent} from "./components/agent/agent-overview/agent-overview.component";
import {PackageOverviewComponent} from "./components/package/package-overview/package-overview.component";
import {DeploymentOverviewComponent} from "./components/deployment/deployment-overview/deployment-overview.component";
import {SettingOverviewComponent} from "./components/setting/setting-overview/setting-overview.component";
import {HomeOverviewComponent} from "./components/home/home-overview/home-overview.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'agent', pathMatch: 'full', component: AgentOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'package', pathMatch: 'full', component: PackageOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'deployment', pathMatch: 'full', component: DeploymentOverviewComponent, canActivate: [keycloakGuard]},
  {path: 'settings', pathMatch: 'full', component: SettingOverviewComponent, canActivate: [keycloakGuard]},
  {path: '**', pathMatch: 'full', component: Error404Component, canActivate: [keycloakGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
