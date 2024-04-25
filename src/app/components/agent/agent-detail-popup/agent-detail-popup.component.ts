import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AgentInformationComponent} from "../agent-information/agent-information.component";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {MatStep, MatStepContent, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {AgentCreateDeploymentComponent} from "../agent-create-deployment/agent-create-deployment.component";
import {SelectListProgressComponent} from "../../select-list-progress/select-list-progress.component";
import {SelectListProgressData} from "../../select-list-progress/selectListProgressData";
import {GroupApiService} from "../../../service/api/group.api.service";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {SelectListItem} from "../../select-list-progress/selectListItem";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {ServerApiService} from "../../../service/api/server.api.service";
import {LoadingComponent} from "../../loading/loading.component";
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {MatTooltip} from "@angular/material/tooltip";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {DeploymentCreateRequest} from "../../../service/api/request/deployment/deploymentCreateRequest";
import {PackageApiService} from "../../../service/api/package.api.service";
import {PackageEntity} from "../../../service/api/entity/packageEntity";

@Component({
  selector: 'app-agent-detail-popup',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    AgentInformationComponent,
    PlaceholderComponent,
    MatStepper,
    MatStep,
    MatStepContent,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    AgentCreateDeploymentComponent,
    SelectListProgressComponent,
    LoadingComponent,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatTooltip,
  ],
  templateUrl: './agent-detail-popup.component.html',
  styleUrl: './agent-detail-popup.component.scss'
})
export class AgentDetailPopupComponent implements OnInit {
  public fontStyleControl = new FormControl("page_one");
  public dataLoaded: boolean = false;
  public agentEntity!: AgentEntity;
  public selectListProgressDataRemoveDeployments!: SelectListProgressData;
  public removeDeploymentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public removeDeploymentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataAddDeployments!: SelectListProgressData;
  public addDeploymentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public addDeploymentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataLeaveGroup!: SelectListProgressData;
  public leaveGroupFunction!: (entry: SelectListItem) => Promise<string | null>;
  public leaveGroupFinishedFunction!: () => Promise<void>;
  public selectListProgressDataJoinGroup!: SelectListProgressData;
  public joinGroupFunction!: (entry: SelectListItem) => Promise<string | null>;
  public joinGroupFinishedFunction!: () => Promise<void>;
  private agentUUID: string = this.data.agentUUID;
  private compatibleGroups!: GroupEntity[];
  private joinedGroups!: GroupEntity[];
  private directDeployments!: DeploymentEntity[];
  private availablePackages!: PackageEntity[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private groupApiService: GroupApiService,
              private agentApiService: AgentApiService,
              private serverApiService: ServerApiService,
              private deploymentApiService: DeploymentApiService,
              private packageApiService: PackageApiService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataLoaded = false;
    await this.loadData();
    this.loadVariablesShowDeployments();
    this.loadVariablesAddDeployments();
    this.loadVariablesLeaveGroups();
    this.loadVariablesJoinGroups();

    this.dataLoaded = true;
  }


  private async loadData(): Promise<void> {
    await this.agentApiService.get(this.agentUUID).then(response => {
      if (response) {
        this.agentEntity = response;
      }
    });

    await this.deploymentApiService.getDeploymentsForAgent(this.agentEntity.uuid).then(response => {
      if (response) {
        this.directDeployments = response.deployments.filter(item => item.directDeployment);
      }
    });

    await this.packageApiService.getAll().then(response => {
      if (response) {
        this.availablePackages = response.packages.filter(item => item.targetOperatingSystem === this.agentEntity.operatingSystem && item.packageStatus !== "MARKED_AS_DELETED");
      }
    });

    await this.groupApiService.getAll().then(response => {
      if (response) {
        this.compatibleGroups = response.groups.filter(item => item.operatingSystem === this.agentEntity.operatingSystem);
      }
    });

    await this.groupApiService.getJoinedGroups(this.agentEntity.uuid).then(response => {
      if (response) {
        this.joinedGroups = response.groups;
      }
    });
  }


  private loadVariablesShowDeployments(): void {
    this.selectListProgressDataRemoveDeployments = new SelectListProgressData(
      this.directDeployments.map((item): SelectListItem => new SelectListItem(item.uuid, item.packageName)),
      "Select Deployments",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "Direct Deployments for these Packages will be deleted:",
      "Delete Deployments",
      "Back",
      "Delete",
      "Status",
      "Deleted"
    );
    this.removeDeploymentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.deploymentApiService.delete(entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.removeDeploymentFinishedFunction = async (): Promise<void> => {
    }
  }

  private loadVariablesAddDeployments(): void {
    this.selectListProgressDataAddDeployments = new SelectListProgressData(
      this.availablePackages.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Deployments",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "Direct Deployments for these Packages will be created:",
      "Create Deployments",
      "Back",
      "Create",
      "Status",
      "Created"
    );
    this.addDeploymentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.deploymentApiService.create(new DeploymentCreateRequest(this.agentEntity.uuid, entry.uuid), true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.addDeploymentFinishedFunction = async (): Promise<void> => {
    }
  }

  private loadVariablesLeaveGroups(): void {
    this.selectListProgressDataLeaveGroup = new SelectListProgressData(
      this.joinedGroups.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Groups",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "The Agent will be removed from these Groups:",
      "Leave Groups",
      "Back",
      "Leave",
      "Status",
      "Removed"
    );
    this.leaveGroupFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.removeMember(entry.uuid, this.agentUUID, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.leaveGroupFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }

  private loadVariablesJoinGroups(): void {
    this.selectListProgressDataJoinGroup = new SelectListProgressData(
      this.compatibleGroups.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Groups",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "The Agent will be added to these Groups:",
      "Join Groups",
      "Back",
      "Join",
      "Status",
      "Joined"
    );
    this.joinGroupFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.addMember(entry.uuid, this.agentUUID, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.joinGroupFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }
}
