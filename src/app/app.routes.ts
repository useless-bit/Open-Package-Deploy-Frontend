import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {TestContentComponent} from "./components/test-content/test-content.component";
import {Error404Component} from "./components/error/error-404/error-404.component";
import {keycloakGuard} from "./guard/keycloak.guard";

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: TestContentComponent, canActivate: [keycloakGuard]},
  {path: '**', pathMatch: 'full', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
