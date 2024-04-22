import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from "./components/error/error-404/error-404.component";
import {KeycloakGuard} from "./guard/keycloak-guard.service";
import {AgentOverviewComponent} from "./components/agent/agent-overview/agent-overview.component";
import {PackageOverviewComponent} from "./components/package/package-overview/package-overview.component";
import {DeploymentOverviewComponent} from "./components/deployment/deployment-overview/deployment-overview.component";
import {SettingOverviewComponent} from "./components/setting/setting-overview/setting-overview.component";
import {HomeOverviewComponent} from "./components/home/home-overview/home-overview.component";
import {LogOverviewComponent} from "./components/log/log-overview/log-overview.component";
import {GroupOverviewComponent} from "./components/group/group-overview/group-overview.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'agent', pathMatch: 'full', component: AgentOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'group', pathMatch: 'full', component: GroupOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'package', pathMatch: 'full', component: PackageOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'deployment', pathMatch: 'full', component: DeploymentOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'settings', pathMatch: 'full', component: SettingOverviewComponent, canActivate: [KeycloakGuard]},
  {path: 'log', pathMatch: 'full', component: LogOverviewComponent, canActivate: [KeycloakGuard]},
  {path: '**', pathMatch: 'full', component: Error404Component, canActivate: [KeycloakGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
