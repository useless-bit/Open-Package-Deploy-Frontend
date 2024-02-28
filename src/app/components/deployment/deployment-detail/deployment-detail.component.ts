import {Component, Input, OnInit} from '@angular/core';
import {LoadingFullscreenComponent} from "../../loading-fullscreen/loading-fullscreen.component";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {ApiService} from "../../../service/api/api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {AgentUpdateRequests} from "../../../service/api/request/agentUpdateRequest";
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

@Component({
  selector: 'app-deployment-detail',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
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

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<DeploymentDetailComponent>) {
  }

  ngOnInit() {
    this.apiService.getDeployment(this.deploymentUUID).then(response => {
      if (response) {
        this.deploymentEntity = response;
        this.dataLoaded = true;
      }
    });
  }

  deleteDeployment() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete deployment",
        "Do you really want to delete the agent? The Agent needs to be enrolled again", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.apiService.deleteDeployment(this.deploymentUUID).then(() => {
          this.dialogRef.close()
        })
      }
    });
  }
}
