import { Component } from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-setting-registration-token',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    MatDivider
  ],
  templateUrl: './setting-registration-token.component.html',
  styleUrl: './setting-registration-token.component.scss'
})
export class SettingRegistrationTokenComponent {
  dataLoaded: boolean = false;

}
