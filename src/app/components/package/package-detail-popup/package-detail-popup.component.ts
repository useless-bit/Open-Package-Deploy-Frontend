import {Component, Inject, OnInit} from '@angular/core';
import {AgentInformationComponent} from "../../agent/agent-information/agent-information.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PackageInformationComponent} from "../package-information/package-information.component";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {SelectListProgressData} from "../../select-list-progress/selectListProgressData";
import {SelectListItem} from "../../select-list-progress/selectListItem";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {LoadingComponent} from "../../loading/loading.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {SelectListProgressComponent} from "../../select-list-progress/select-list-progress.component";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {DeploymentCreateRequest} from "../../../service/api/request/deployment/deploymentCreateRequest";
import {GroupApiService} from "../../../service/api/group.api.service";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-package-detail-popup',
  standalone: true,
  imports: [
    AgentInformationComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PlaceholderComponent,
    NgSwitch,
    ReactiveFormsModule,
    PackageInformationComponent,
    LoadingComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    SelectListProgressComponent
  ],
  templateUrl: './package-detail-popup.component.html',
  styleUrl: './package-detail-popup.component.scss'
})
export class PackageDetailPopupComponent implements OnInit {
  public fontStyleControl = new FormControl("page_one");
  public dataLoaded: boolean = false;
  public packageEntity!: PackageEntity;
  public selectListProgressDataRemoveAgents!: SelectListProgressData;
  public removeAgentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public removeAgentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataAddAgents!: SelectListProgressData;
  public addAgentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public addAgentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataRemoveFromGroups!: SelectListProgressData;
  public removeFromGroupFunction!: (entry: SelectListItem) => Promise<string | null>;
  public removeFromGroupFinishedFunction!: () => Promise<void>;
  public selectListProgressDataAddToGroups!: SelectListProgressData;
  public addToGroupFunction!: (entry: SelectListItem) => Promise<string | null>;
  public addToGroupFinishedFunction!: () => Promise<void>;
  private packageUUID: string = this.data.packageUUID;
  private directDeployments!: DeploymentEntity[];
  private availableAgents!: AgentEntity[];
  private deployedToGroup!: GroupEntity[];
  private availableGroups!: GroupEntity[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private packageApiService: PackageApiService,
              private serverApiService: ServerApiService,
              private deploymentApiService: DeploymentApiService,
              private agentApiService: AgentApiService,
              private groupApiService: GroupApiService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataLoaded = false;
    await this.loadData();
    this.loadVariablesShowAgents();
    this.loadVariablesAddAgents();
    this.loadVariablesShowGroups();
    this.loadVariablesAddToGroups();

    this.dataLoaded = true;
  }

  private async loadData(): Promise<void> {
    await this.packageApiService.get(this.packageUUID).then(response => {
      if (response) {
        this.packageEntity = response;
      }
    });

    await this.deploymentApiService.getDeploymentsForPackage(this.packageEntity.uuid).then(response => {
      if (response) {
        this.directDeployments = response.deployments.filter(item => item.directDeployment);
      }
    });

    await this.agentApiService.getAll().then(response => {
      if (response) {
        this.availableAgents = response.agents.filter(item => item.registrationCompleted && item.operatingSystem === this.packageEntity.targetOperatingSystem);
      }
    });

    await this.groupApiService.getDeployedGroups(this.packageEntity.uuid).then(response => {
      if (response) {
        this.deployedToGroup = response.groups;
      }
    });

    await this.groupApiService.getAll().then(response => {
      if (response) {
        this.availableGroups = response.groups.filter(item => item.operatingSystem === this.packageEntity.targetOperatingSystem);
      }
    });
  }

  private loadVariablesShowAgents(): void {
    this.selectListProgressDataRemoveAgents = new SelectListProgressData(
      this.directDeployments.map((item): SelectListItem => new SelectListItem(item.uuid, item.agentName)),
      "Select Agents",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "Direct Deployments for these Agents will be deleted:",
      "Delete Deployments",
      "Back",
      "Delete",
      "Status",
      "Deleted"
    );
    this.removeAgentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.deploymentApiService.delete(entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.removeAgentFinishedFunction = async (): Promise<void> => {
    }
  }

  private loadVariablesAddAgents(): void {
    this.selectListProgressDataAddAgents = new SelectListProgressData(
      this.availableAgents.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Agents",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "Direct Deployments for these Agents will be created:",
      "Create Deployments",
      "Back",
      "Create",
      "Status",
      "Created"
    );
    this.addAgentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.deploymentApiService.create(new DeploymentCreateRequest(entry.uuid, this.packageEntity.uuid), true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.addAgentFinishedFunction = async (): Promise<void> => {
    }
  }

  private loadVariablesShowGroups(): void {
    this.selectListProgressDataRemoveFromGroups = new SelectListProgressData(
      this.deployedToGroup.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Groups",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "The Package will be removed from these Groups:",
      "Remove from Groups",
      "Back",
      "Remove",
      "Status",
      "Removed"
    );
    this.removeFromGroupFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.removePackage(entry.uuid, this.packageEntity.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.removeFromGroupFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }

  private loadVariablesAddToGroups(): void {
    this.selectListProgressDataAddToGroups = new SelectListProgressData(
      this.availableGroups.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Groups",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "The Package will be added to these Groups:",
      "Add to Groups",
      "Back",
      "Add",
      "Status",
      "Added"
    );
    this.addToGroupFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.addPackage(entry.uuid, this.packageEntity.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.addToGroupFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }
}
