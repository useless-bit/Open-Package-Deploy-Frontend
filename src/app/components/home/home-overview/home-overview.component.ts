import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {HomeServerStorageStatusComponent} from "../home-server-storage-status/home-server-storage-status.component";

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
    MatLabel,
    MatProgressBar,
    MatProgressSpinner,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    HomeServerStorageStatusComponent
  ],
  templateUrl: './home-overview.component.html',
  styleUrl: './home-overview.component.scss'
})
export class HomeOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('homeAgentStatusComponent') homeAgentStatusComponent: HomeAgentStatusComponent | undefined;
  @ViewChild('homePackageStatusComponent') homePackageStatusComponent: HomePackageStatusComponent | undefined;
  @ViewChild('homeDeploymentStatusComponent') homeDeploymentStatusComponent: HomeDeploymentStatusComponent | undefined;
  @ViewChild('homeServerStorageStatusComponent') homeServerStorageStatusComponent: HomeServerStorageStatusComponent | undefined;
  intervalLoop: number | undefined;
  defaultRefreshIntervalSeconds: number = 30;
  refreshIntervalSeconds: number = 0;
  refreshIntervalRemainingSeconds: number = 0;
  minRefreshIntervalSeconds: number = 10;
  formControlRefreshIntervalInput: FormControl = new FormControl('', [Validators.required, Validators.min(this.minRefreshIntervalSeconds)]);
  private localStorageNameRefreshInterval: string = "refreshInterval_Home";

  changeRefreshInterval(): void {
    this.formControlRefreshIntervalInput.markAllAsTouched();
    if (this.formControlRefreshIntervalInput.valid) {
      this.refreshIntervalSeconds = this.formControlRefreshIntervalInput.value;
      localStorage.setItem(this.localStorageNameRefreshInterval, String(this.refreshIntervalSeconds));
      clearInterval(this.intervalLoop);
      this.refreshLoop();
    }
  }

  refreshComponents(): void {
    this.homeAgentStatusComponent?.refreshData();
    this.homePackageStatusComponent?.refreshData();
    this.homeDeploymentStatusComponent?.refreshData();
    this.homeServerStorageStatusComponent?.refreshData();
  }

  refreshLoop(): void {
    this.refreshIntervalRemainingSeconds = this.refreshIntervalSeconds;
    this.intervalLoop = setInterval(() => {
      this.refreshIntervalRemainingSeconds -= 1;
      if (this.refreshIntervalRemainingSeconds <= 0) {
        this.refreshComponents();
        clearInterval(this.intervalLoop);
        this.refreshLoop();
      }
    }, 1000);

  }

  ngOnInit(): void {
    const storedRefreshInterval = localStorage.getItem(this.localStorageNameRefreshInterval);
    if (storedRefreshInterval && !isNaN(Number(storedRefreshInterval)) && Number(storedRefreshInterval) >= this.minRefreshIntervalSeconds) {
      this.refreshIntervalSeconds = Number(storedRefreshInterval);
    } else {
      this.refreshIntervalSeconds = this.defaultRefreshIntervalSeconds;
    }
    this.formControlRefreshIntervalInput.setValue(this.refreshIntervalSeconds);
    localStorage.setItem(this.localStorageNameRefreshInterval, String(this.refreshIntervalSeconds));
    this.refreshLoop();
  }

  ngOnDestroy() {
    clearInterval(this.intervalLoop);
  }
}
