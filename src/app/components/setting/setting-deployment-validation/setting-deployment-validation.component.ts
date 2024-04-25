import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServerApiService} from "../../../service/api/server.api.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../../shared-components/dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../../shared-components/dialog-text-input/dialogTextInputData";
import {ServerDeploymentValidationRequest} from "../../../service/api/request/server/serverDeploymentValidationRequest";
import {DialogConfirmCancelComponent} from "../../../shared-components/dialog-confirm-cancel/dialog-confirm-cancel.component";

@Component({
  selector: 'app-setting-deployment-validation',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput
  ],
  templateUrl: './setting-deployment-validation.component.html',
  styleUrl: './setting-deployment-validation.component.scss'
})
export class SettingDeploymentValidationComponent implements OnInit {
  dataLoaded: boolean = false;
  deploymentValidationInterval: number | null = null;
  lastDeploymentValidationTimestamp: Date | string = "";

  constructor(private serverApiService: ServerApiService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.serverApiService.getDeploymentValidationInterval().then(intervalResponse => {
      this.serverApiService.getLastDeploymentValidationTimestamp().then(lastDeploymentResponse => {
        if (intervalResponse) {
          this.deploymentValidationInterval = intervalResponse;
          if (lastDeploymentResponse) {
            this.lastDeploymentValidationTimestamp = new Date(lastDeploymentResponse * 1000);
          } else {
            this.lastDeploymentValidationTimestamp = "Not run yet";
          }
          this.dataLoaded = true;
        }

      })
    });
  }

  changeDeploymentValidationInterval() {
    const dialogRef = this.matDialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Change deployment validation interval", "Set the new deployment validation interval (in seconds):", "Cancel", "Update", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.serverApiService.changeDeploymentValidationInterval(new ServerDeploymentValidationRequest(result)).finally(() => {
          this.ngOnInit();
        })
      }
    });
  }

  resetDeploymentValidation() {
    const dialogRef = this.matDialog.open(DialogConfirmCancelComponent, {
      data: new DialogTextInputData("Validate Deployments now", "Do you want to reset the last deployment time and trigger a new validation?", "Cancel", "Reset", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.serverApiService.resetDeploymentValidation().finally(() => {
          this.ngOnInit();
        })
      }
    });
  }

}
