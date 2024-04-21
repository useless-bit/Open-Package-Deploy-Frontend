import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiErrorResponse} from "../../../service/api/reponse/apiErrorResponse";
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-group-add-package',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatListOption,
    MatProgressBar,
    MatSelectionList,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf
  ],
  templateUrl: './group-add-package.component.html',
  styleUrl: './group-add-package.component.scss'
})
export class GroupAddPackageComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public agentResponse: PackageEntity[] | null = null;
  public agentSelectList: PackageEntity[] = [];
  public selectedAgents: PackageEntity[] = [];
  public groupEntity: GroupEntity | null = null;
  public deploymentCreationProcessStarted: boolean = false;
  public deploymentCreationProgress: number = 0;
  public createdDeploymentStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private packageApiService: PackageApiService,
              private serverApiService: ServerApiService,
              private changeDetector: ChangeDetectorRef,
              public packageCreateDeploymentComponentMatDialogRef: MatDialogRef<GroupAddPackageComponent>) {
  }

  ngOnInit() {
    this.groupApiService.get(this.groupUUID).then(groupResponse => {
      this.packageApiService.getAll().then(packageResponse => {
        if (packageResponse && groupResponse) {
          this.groupEntity = groupResponse;
          this.agentResponse = packageResponse.packages;
          this.filterAgents();
          this.agentSelectList = this.agentResponse;
          this.dataLoaded = true;
        }
      });
    });
  }

  changeSelectedAgents(event: boolean, agentUUID: string) {
    if (this.agentResponse) {
      if (event) {
        let packageEntity = this.agentResponse.filter(item => item.uuid == agentUUID).at(0);
        if (packageEntity && this.selectedAgents.filter(item => item.uuid == agentUUID).length == 0) {
          this.selectedAgents?.push(packageEntity);
        }
      } else {
        this.selectedAgents = this.selectedAgents.filter(item => item.uuid !== agentUUID);
      }
    }
  }

  createDeploymentsForPackage() {
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = true;
    this.deploymentCreationProgress = 0;
    this.deploymentCreationProcessStarted = true;
    this.createdDeploymentStatus = [];
    for (let selectedAgent of this.selectedAgents) {
      this.groupApiService.addPackage(this.groupUUID, selectedAgent.uuid, true).then(() => {
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> Added")
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedAgents.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> " + errorResponse.message)
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedAgents.length));
        });
    }
    this.serverApiService.resetDeploymentValidation().then();
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = false;
    this.deploymentCreationProcessStarted = false;
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.agentResponse) {
      this.agentSelectList = this.agentResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
    this.changeDetector.detectChanges();
  }

  addVisibleAgents() {
    let agentsToAdd = this.agentSelectList.filter(item => !this.selectedAgents.includes(item));
    this.selectedAgents = this.selectedAgents.concat(agentsToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisibleAgents() {
    this.selectedAgents = this.selectedAgents.filter(item => !this.agentSelectList.includes(item));
    this.changeDetector.detectChanges();

  }

  isAgentInSelectedAgentList(agentUUID: string): boolean {
    return this.selectedAgents.filter(item => item.uuid === agentUUID).length > 0;
  }

  private filterAgents(): void {
    if (this.agentResponse) {
      this.agentResponse = this.agentResponse.filter(item => item.targetOperatingSystem === this.groupEntity?.operatingSystem);
    }
  }
}
