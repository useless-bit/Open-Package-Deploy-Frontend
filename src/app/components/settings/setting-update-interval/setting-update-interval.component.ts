import { Component } from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-setting-update-interval',
  standalone: true,
    imports: [
        LoadingComponent,
        MatDivider,
        NgIf
    ],
  templateUrl: './setting-update-interval.component.html',
  styleUrl: './setting-update-interval.component.scss'
})
export class SettingUpdateIntervalComponent {
  dataLoaded: boolean = false;

}
