import {Component} from '@angular/core';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatIcon,
    MatFabButton,
    MatButton,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  constructor(private readonly keycloakService: KeycloakService) {
  }

  logoutButtonPress() {
    this.keycloakService.logout()
  }
}
