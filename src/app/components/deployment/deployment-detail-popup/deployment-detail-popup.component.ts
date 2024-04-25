import {Component, Inject, OnInit} from '@angular/core';
import {AgentInformationComponent} from "../../agent/agent-information/agent-information.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DeploymentInformationComponent} from "../deployment-information/deployment-information.component";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {LoadingComponent} from "../../loading/loading.component";

@Component({
  selector: 'app-deployment-detail-popup',
  standalone: true,
  imports: [
    AgentInformationComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PlaceholderComponent,
    ReactiveFormsModule,
    NgSwitch,
    DeploymentInformationComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    LoadingComponent
  ],
  templateUrl: './deployment-detail-popup.component.html',
  styleUrl: './deployment-detail-popup.component.scss'
})
export class DeploymentDetailPopupComponent implements OnInit {
  public fontStyleControl = new FormControl("page_one");
  public dataLoaded: boolean = false;

  public deploymentEntity!: DeploymentEntity;

  private deploymentUUID: string = this.data.deploymentUUID;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private deploymentApiService: DeploymentApiService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataLoaded = false;
    await this.loadData();

    this.dataLoaded = true;
  }

  private async loadData(): Promise<void> {
    await this.deploymentApiService.get(this.deploymentUUID).then(response => {
      if (response) {
        this.deploymentEntity = response;
      }
    });
  }
}
