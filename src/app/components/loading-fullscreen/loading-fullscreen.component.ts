import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loading-fullscreen',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatIcon,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './loading-fullscreen.component.html',
  styleUrl: './loading-fullscreen.component.scss'
})
export class LoadingFullscreenComponent {

}
