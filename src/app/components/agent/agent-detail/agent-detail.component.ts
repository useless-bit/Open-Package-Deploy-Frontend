import {Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {AgentUpdateRequests} from "../../../service/api/request/agentUpdateRequest";
import {MatLine} from "@angular/material/core";
import {DialogConfirmCancelComponent} from "../../dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../dialog-confirm-cancel/dialogConfirmCancelInput";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";

@Component({
  selector: 'app-agent-detail',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatDivider,
    MatListSubheaderCssMatStyler,
    MatCardHeader,
    MatCardSubtitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelContent,
    MatLine
  ],
  templateUrl: './agent-detail.component.html',
  styleUrl: './agent-detail.component.scss'
})
export class AgentDetailComponent implements OnInit {
  @Input() public agentUUID: string = "";

  public dataLoaded: boolean = false;
  public agentEntity: AgentEntity | null = null;

  constructor(private agentApiService: AgentApiService,
              private deploymentApiService: DeploymentApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<AgentDetailComponent>) {
  }

  ngOnInit() {
    this.agentApiService.get(this.agentUUID).then(response => {
      if (response) {
        this.agentEntity = response;
        this.dataLoaded = true;
      }
    });
  }

  updateAgentName() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update name for Agent: " + this.agentEntity?.name,
        "Enter new name:", "Cancel", "Update", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.agentApiService.update(this.agentUUID, new AgentUpdateRequests(result)).then(() => {
          this.ngOnInit();
        })
      }
    });
  }

  deleteAgent() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete Agent: " + this.agentEntity?.name,
        "Do you really want to delete the agent? The Agent needs to be enrolled again", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.agentApiService.delete(this.agentUUID).then(() => {
          this.dialogRef.close()
        })
      }
    });
  }

  resetAllDeployments() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Reset all deployments for: " + this.agentEntity?.name,
        "Do you want to reset all deployments for this agent?", "Cancel", "Reset")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.deploymentApiService.resetForAgent(this.agentUUID).then(() => {
          this.ngOnInit();
        })
      }
    });

  }
}

