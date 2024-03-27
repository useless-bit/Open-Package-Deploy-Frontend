import {Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogConfirmCancelComponent} from "../../dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../dialog-confirm-cancel/dialogConfirmCancelInput";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatLine} from "@angular/material/core";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";

@Component({
  selector: 'app-deployment-detail',
  standalone: true,
  imports: [
    LoadingComponent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatButton,
    MatList,
    MatListItem,
    MatDivider,
    MatLine,
    NgIf,
    MatIcon
  ],
  templateUrl: './deployment-detail.component.html',
  styleUrl: './deployment-detail.component.scss'
})
export class DeploymentDetailComponent implements OnInit {
  @Input() public deploymentUUID: string = "";

  public dataLoaded: boolean = false;
  public deploymentEntity: DeploymentEntity | null = null;

  constructor(private deploymentApiService: DeploymentApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<DeploymentDetailComponent>) {
  }

  ngOnInit() {
    this.deploymentApiService.get(this.deploymentUUID).then(response => {
      if (response) {
        this.deploymentEntity = response;
        this.dataLoaded = true;
      }
    });
  }

  deleteDeployment() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete deployment",
        "Do you really want to delete the deployment?", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.deploymentApiService.delete(this.deploymentUUID).then(() => {
          this.dialogRef.close()
        })
      }
    });
  }

  resetDeployment() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Reset deployment: " + this.deploymentEntity?.packageName + " -> " + this.deploymentEntity?.agentName,
        "Do you want to reset this deployment?", "Cancel", "Reset")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false;
        this.deploymentApiService.reset(this.deploymentUUID).then(() => {
          this.ngOnInit();
        })
      }
    });
  }

}