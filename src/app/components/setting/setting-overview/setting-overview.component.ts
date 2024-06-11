import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {SettingRegistrationTokenComponent} from "../setting-registration-token/setting-registration-token.component";
import {SettingUpdateIntervalComponent} from "../setting-update-interval/setting-update-interval.component";
import {
  SettingInstallRetryIntervalComponent
} from "../setting-install-retry-interval/setting-install-retry-interval.component";
import {
  SettingDeploymentValidationComponent
} from "../setting-deployment-validation/setting-deployment-validation.component";

@Component({
  selector: 'app-setting-overview',
  standalone: true,
  imports: [
    MatCard,
    SettingRegistrationTokenComponent,
    SettingUpdateIntervalComponent,
    SettingInstallRetryIntervalComponent,
    SettingDeploymentValidationComponent
  ],
  templateUrl: './setting-overview.component.html',
  styleUrl: './setting-overview.component.scss'
})
export class SettingOverviewComponent {

}
