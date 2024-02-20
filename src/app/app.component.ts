import {Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TestContentComponent} from "./components/test-content/test-content.component";
import {MatDrawer, MatDrawerContainer, MatDrawerMode} from "@angular/material/sidenav";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestContentComponent, MatDrawerContainer, MatDrawer, SidenavComponent, MatIconButton, NgIf, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('matDrawer') sidenav: MatDrawer | null = null;
  public sidenavMode: MatDrawerMode = "side";
  private breakpointObserver: BreakpointObserver;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointObserver = breakpointObserver;
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      console.log(result);
      if (result.matches) {
        this.sidenav?.close()
        this.sidenavMode = "over"
      } else {
        this.sidenavMode = "side"
        this.sidenav?.open()
      }
      console.log(this.sidenav?.opened);
    });
  }

  // Toggle sidebar on mobile devices
  openSideNav() {
    if (this.sidenav) {
      console.log("test")
      this.sidenav.toggle();
    }
  }
}
