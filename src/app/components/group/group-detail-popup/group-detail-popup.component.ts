import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {PackageInformationComponent} from "../../package/package-information/package-information.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupInformationComponent} from "../group-information/group-information.component";
import {ArrayPopupComponent} from "../../../shared-components/array-popup/array-popup.component";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {SelectListProgressData} from "../../../shared-components/select-list-progress/selectListProgressData";
import {SelectListItem} from "../../../shared-components/select-list-progress/selectListItem";
import {LoadingComponent} from "../../loading/loading.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {ServerApiService} from "../../../service/api/server.api.service";
import {GroupMember} from "../../../service/api/reponse/group/groupMember";
import {
  SelectListProgressComponent
} from "../../../shared-components/select-list-progress/select-list-progress.component";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {GroupPackage} from "../../../service/api/reponse/group/groupPackage";
import {PackageApiService} from "../../../service/api/package.api.service";
import {PackageEntity} from "../../../service/api/entity/packageEntity";

@Component({
  selector: 'app-group-detail-popup',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PackageInformationComponent,
    ReactiveFormsModule,
    NgSwitch,
    GroupInformationComponent,
    ArrayPopupComponent,
    LoadingComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    SelectListProgressComponent
  ],
  templateUrl: './group-detail-popup.component.html',
  styleUrl: './group-detail-popup.component.scss'
})
export class GroupDetailPopupComponent implements OnInit {
  public fontStyleControl = new FormControl("page_one");
  public dataLoaded: boolean = false;
  public groupEntity!: GroupEntity;
  public selectListProgressDataRemoveAgents!: SelectListProgressData;
  public removeAgentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public removeAgentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataAddAgents!: SelectListProgressData;
  public addAgentFunction!: (entry: SelectListItem) => Promise<string | null>;
  public addAgentFinishedFunction!: () => Promise<void>;
  public selectListProgressDataRemovePackages!: SelectListProgressData;
  public removePackageFunction!: (entry: SelectListItem) => Promise<string | null>;
  public removePackageFinishedFunction!: () => Promise<void>;
  public selectListProgressDataAddPackages!: SelectListProgressData;
  public addPackageFunction!: (entry: SelectListItem) => Promise<string | null>;
  public addPackageFinishedFunction!: () => Promise<void>;

  private groupUUID: string = this.data.groupUUID;
  private members!: GroupMember[];
  private deployedPackages!: GroupPackage[];
  private compatibleAgents!: AgentEntity[];
  private availablePackages!: PackageEntity[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private groupApiService: GroupApiService,
              private serverApiService: ServerApiService,
              private agentApiService: AgentApiService,
              private packageApiService: PackageApiService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataLoaded = false;
    await this.loadData();
    this.loadVariablesShowAgents();
    this.loadVariablesAddAgents();
    this.loadVariablesShowPackages();
    this.loadVariablesAddPackages();

    this.dataLoaded = true;
  }

  private async loadData(): Promise<void> {
    await this.groupApiService.get(this.groupUUID).then(response => {
      if (response) {
        this.groupEntity = response;
      }
    });

    await this.groupApiService.getMembers(this.groupEntity.uuid).then(response => {
      if (response) {
        this.members = response.members;
      }
    });

    await this.groupApiService.getPackages(this.groupEntity.uuid).then(response => {
      if (response) {
        this.deployedPackages = response.packages;
      }
    });

    await this.agentApiService.getAll().then(response => {
      if (response) {
        this.compatibleAgents = response.agents.filter(item => item.registrationCompleted && item.operatingSystem === this.groupEntity.operatingSystem);
      }
    });

    await this.packageApiService.getAll().then(response => {
      if (response) {
        this.availablePackages = response.packages.filter(item => item.targetOperatingSystem === this.groupEntity.operatingSystem && item.packageStatus !== "MARKED_AS_DELETED");
      }
    });
  }

  private loadVariablesShowAgents(): void {
    this.selectListProgressDataRemoveAgents = new SelectListProgressData(
      this.members.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Agents",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "These Agents will be removed from the Group:",
      "Remove Agents",
      "Back",
      "Remove",
      "Status",
      "Removed"
    );
    this.removeAgentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.removeMember(this.groupEntity.uuid, entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.removeAgentFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }

  private loadVariablesAddAgents(): void {
    this.selectListProgressDataAddAgents = new SelectListProgressData(
      this.compatibleAgents.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Agents",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "These Agents will be added to the Group:",
      "Add Agents",
      "Back",
      "Add",
      "Status",
      "Added"
    );
    this.addAgentFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.addMember(this.groupEntity.uuid, entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.addAgentFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }

  private loadVariablesShowPackages(): void {
    this.selectListProgressDataRemovePackages = new SelectListProgressData(
      this.deployedPackages.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Packages",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "These Packages will be removed from the Group:",
      "Remove Packages",
      "Back",
      "Remove",
      "Status",
      "Removed"
    );
    this.removePackageFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.removePackage(this.groupEntity.uuid, entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.removePackageFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }

  private loadVariablesAddPackages(): void {
    this.selectListProgressDataAddPackages = new SelectListProgressData(
      this.availablePackages.map((item): SelectListItem => new SelectListItem(item.uuid, item.name)),
      "Select Packages",
      "Back",
      "Next",
      "Search",
      "Summary",
      "Back",
      "Next",
      "These Packages will be added to the Group:",
      "Add Packages",
      "Back",
      "Add",
      "Status",
      "Added"
    );
    this.addPackageFunction = async (entry: SelectListItem): Promise<string | null> => {
      try {
        await this.groupApiService.addPackage(this.groupEntity.uuid, entry.uuid, true);
        return null;
      } catch (response) {
        return response as string;
      }
    }
    this.addPackageFinishedFunction = async (): Promise<void> => {
      await this.serverApiService.resetDeploymentValidation();
    }
  }
}
