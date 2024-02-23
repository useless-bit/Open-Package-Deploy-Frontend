import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatIcon,
    RouterLink
  ],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.scss'
})
export class PlaceholderComponent {

}
