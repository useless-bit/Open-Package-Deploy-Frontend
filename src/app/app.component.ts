import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
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
  imports: [RouterOutlet, MatDrawerContainer, MatDrawer, SidenavComponent, MatIconButton, NgIf, MatIcon, MatProgressSpinner, LoadingFullscreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('matDrawer') matDrawer: MatDrawer | null = null;
  public sidenavMode: MatDrawerMode = "over";
  public appLoaded: boolean = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  private breakpointObserver: BreakpointObserver;

  constructor(breakpointObserver: BreakpointObserver,
              private readonly keycloakService: KeycloakService,
              private applicationLoadedService: ApplicationLoadedService,
              private changeDetector: ChangeDetectorRef) {
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
      this.changeDetector.detectChanges();
    });
  }

  public async ngOnInit() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        this.keycloakService.loadUserProfile().then(userProfile => this.userProfile = userProfile);
        if (event.type == KeycloakEventType.OnAuthSuccess) {
          this.isLoggedIn = this.keycloakService.isLoggedIn();
        }
        if (event.type == KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(30);
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
