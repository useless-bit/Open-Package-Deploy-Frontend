import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ArrayPopupComponent} from "../../array-popup/array-popup.component";
import {ArrayPopupInput} from "../../array-popup/arrayPopupInput";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-home-deployment-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar
  ],
  templateUrl: './home-deployment-status.component.html',
  styleUrl: './home-deployment-status.component.scss'
})
export class HomeDeploymentStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public refreshingData: boolean = false;
  public deploymentCount: number = 0;
  public deploymentOutstandingCount: number = 0;
  public deploymentErrorCount: number = 0;
  public deploymentCompletedCount: number = 0;

  private deploymentEntities: DeploymentEntity[] = [];
  private deploymentEntitiesOutstanding: DeploymentEntity[] = [];
  private deploymentEntitiesError: DeploymentEntity[] = [];
  private deploymentEntitiesCompleted: DeploymentEntity[] = [];
  private dialogRef: MatDialogRef<ArrayPopupComponent> | undefined;


  constructor(private deploymentApiService: DeploymentApiService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.deploymentApiService.getAll().then(deploymentResponse => {
      if (deploymentResponse) {
        this.deploymentEntities = deploymentResponse.deployments;
        this.calculateDeployments()
        this.dataLoaded = true;
        this.refreshingData = false;
        this.updatePopupData();
      }
    });
  }

  calculateDeployments(): void {
    this.deploymentCount = this.deploymentEntities.length;
    this.deploymentEntitiesError = this.deploymentEntities.filter(item => !item.isDeployed && item.lastDeploymentTime !== "N/A");
    this.deploymentErrorCount = this.deploymentEntitiesError.length;
    this.deploymentEntitiesOutstanding = this.deploymentEntities.filter(item => !item.isDeployed);
    this.deploymentOutstandingCount = this.deploymentEntitiesOutstanding.length;
    this.deploymentEntitiesCompleted = this.deploymentEntities.filter(item => item.isDeployed);
    this.deploymentCompletedCount = this.deploymentEntitiesCompleted.length;
  }

  refreshData(): void {
    this.refreshingData = true;
    this.ngOnInit();
  }

  showOutstandingDeploymentPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Outstanding Deployments", this.deploymentEntitiesOutstanding.map(item => item.packageName + " | " + item.packageUuid + " -> " + item.agentName + " | " + item.agentUuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  showFailedDeploymentsPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Failed Deployments", this.deploymentEntitiesError.map(item => item.packageName + " | " + item.packageUuid + " -> " + item.agentName + " | " + item.agentUuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  updatePopupData(): void {
    if (this.dialogRef) {
      if (this.dialogRef.componentInstance.arrayPopupInput.title == "Outstanding Deployments") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.deploymentEntitiesOutstanding.map(item => item.packageName + " | " + item.packageUuid + " -> " + item.agentName + " | " + item.agentUuid);
      } else if (this.dialogRef.componentInstance.arrayPopupInput.title == "Failed Deployments") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.deploymentEntitiesError.map(item => item.packageName + " | " + item.packageUuid + " -> " + item.agentName + " | " + item.agentUuid);

      }
    }
  }
}
