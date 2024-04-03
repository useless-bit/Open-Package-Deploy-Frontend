import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {HomePackageStatusComponent} from "../home-package-status/home-package-status.component";
import {HomeDeploymentStatusComponent} from "../home-deployment-status/home-deployment-status.component";
import {HomeAgentStatusComponent} from "../home-agent-status/home-agent-status.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-overview',
  standalone: true,
  imports: [
    MatCard,
    PlaceholderComponent,
    HomePackageStatusComponent,
    HomeDeploymentStatusComponent,
    HomeAgentStatusComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatDivider,
    ReactiveFormsModule,
    MatError,
    MatLabel
  ],
  templateUrl: './home-overview.component.html',
  styleUrl: './home-overview.component.scss'
})
export class HomeOverviewComponent implements OnInit {
  @ViewChild('homeAgentStatusComponentReloadTarget') homeAgentStatusComponentReloadTarget: HomeAgentStatusComponent | undefined;
  intervalLoop: number | undefined;
  refreshIntervalSeconds: number = 30;
  formControlRefreshIntervalInput: FormControl = new FormControl('', [Validators.required, Validators.min(Number.MIN_VALUE)]);

  changeRefreshInterval(): void {
    this.formControlRefreshIntervalInput.markAllAsTouched();
    if (this.formControlRefreshIntervalInput.valid) {
      this.refreshIntervalSeconds = this.formControlRefreshIntervalInput.value
      clearInterval(this.intervalLoop);
      this.createRefreshLoop();
    }
  }

  createRefreshLoop(): void {
    this.intervalLoop = setInterval(() => {
      this.homeAgentStatusComponentReloadTarget?.refreshData();
    }, this.refreshIntervalSeconds * 1000);

  }

  ngOnInit(): void {
    this.formControlRefreshIntervalInput.setValue(this.refreshIntervalSeconds);
    this.createRefreshLoop();
  }
}
