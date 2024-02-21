import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-error-404',
  standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatButton,
        RouterLink,
        MatIcon,
        MatIconButton,
        NgIf
    ],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss'
})
export class Error404Component {

}
