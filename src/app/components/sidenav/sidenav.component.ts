import { Component } from '@angular/core';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatIcon,
    MatFabButton,
    MatButton
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
