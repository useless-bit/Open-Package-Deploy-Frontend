import {
  AfterContentChecked,
  AfterContentInit,
  AfterRenderPhase, AfterViewChecked,
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TestContentComponent} from "./components/test-content/test-content.component";
import {MatDrawer, MatDrawerContainer, MatDrawerMode} from "@angular/material/sidenav";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ApplicationLoadedService} from "./service/application-loaded/application-loaded.service";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingFullscreenComponent} from "./components/loading-fullscreen/loading-fullscreen.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestContentComponent, MatDrawerContainer, MatDrawer, SidenavComponent, MatIconButton, NgIf, MatIcon, MatProgressSpinner, LoadingFullscreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  @ViewChild('matDrawer') matDrawer: MatDrawer | null = null;
  public sidenavMode: MatDrawerMode = "over";
  public appLoaded: boolean = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  private breakpointObserver: BreakpointObserver;

  constructor(breakpointObserver: BreakpointObserver,
              private readonly keycloakService: KeycloakService,
              private applicationLoadedService: ApplicationLoadedService) {
    this.breakpointObserver = breakpointObserver;
    this.applicationLoadedService.initFinished.subscribe((isFinished) => {
      if (isFinished) {
        this.appLoaded = true;
      }
    });
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
        this.sidenavMode = "over"
        this.matDrawer?.close()
      } else {
        this.sidenavMode = "side"
        this.matDrawer?.open()
      }
    });
  }

  public async ngOnInit() {
    this.isLoggedIn = this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }

    this.keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20);
        }
      }
    });
  }

  // Toggle sidebar on mobile devices
  openSideNav() {
    if (this.matDrawer) {
      this.matDrawer.toggle();
    }
  }
}
