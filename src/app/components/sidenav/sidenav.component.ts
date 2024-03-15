import {Component, OnInit} from '@angular/core';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatIcon,
    MatFabButton,
    MatButton,
    RouterLink,
    NgClass
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  public currentUrl: string = "";

  constructor(private readonly keycloakService: KeycloakService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((route: any) => {
      if (route.url) {
        this.currentUrl = "/" + route.url.split("/")[1];
      }
    });
  }

  logoutButtonPress() {
    this.keycloakService.logout()
  }
}
