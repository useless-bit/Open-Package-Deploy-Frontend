import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {MatCard} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";
import {SettingRegistrationTokenComponent} from "../setting-registration-token/setting-registration-token.component";
import {SettingUpdateIntervalComponent} from "../setting-update-interval/setting-update-interval.component";

@Component({
  selector: 'app-settings-overview',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    PlaceholderComponent,
    MatCard,
    MatLabel,
    SettingRegistrationTokenComponent,
    SettingUpdateIntervalComponent,
  ],
  templateUrl: './settings-overview.component.html',
  styleUrl: './settings-overview.component.scss'
})
export class SettingsOverviewComponent {
}
