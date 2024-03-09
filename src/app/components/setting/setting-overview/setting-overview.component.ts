import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {SettingRegistrationTokenComponent} from "../setting-registration-token/setting-registration-token.component";
import {SettingUpdateIntervalComponent} from "../setting-update-interval/setting-update-interval.component";

@Component({
  selector: 'app-setting-overview',
  standalone: true,
  imports: [
    MatCard,
    SettingRegistrationTokenComponent,
    SettingUpdateIntervalComponent
  ],
  templateUrl: './setting-overview.component.html',
  styleUrl: './setting-overview.component.scss'
})
export class SettingOverviewComponent {

}
