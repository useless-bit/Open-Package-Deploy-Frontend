import {Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {PackageApiService} from "../../../service/api/package.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CreateDeploymentRequest} from "../../../service/api/request/createDeploymentRequest";
import {ApiErrorResponse} from "../../../service/api/reponse/apiErrorResponse";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-package-create-deployment',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
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
    NgIf,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatTooltip
  ],
  templateUrl: './package-create-deployment.component.html',
  styleUrl: './package-create-deployment.component.scss'
})
export class PackageCreateDeploymentComponent implements OnInit {
  @Input() public packageUUID: string = "";

  public dataLoaded: boolean = false;
  public packageEntity: PackageEntity | null = null;
  public agentResponse: AgentEntity[] | null = null;
  public agentSelectList: AgentEntity[] = [];
  public selectedAgents: AgentEntity[] = [];
  public deploymentCreationProcessStarted: boolean = false;
  public deploymentCreationProgress: number = 0;
  public createdDeploymentStatus: string[] = [];


  constructor(private deploymentApiService: DeploymentApiService,
              private packageApiService: PackageApiService,
              private agentApiService: AgentApiService,
              public packageCreateDeploymentComponentMatDialogRef: MatDialogRef<PackageCreateDeploymentComponent>) {
  }

  ngOnInit() {
    this.packageApiService.get(this.packageUUID).then(packageResponse => {
      this.agentApiService.getAll().then(agentResponse => {
        if (packageResponse && agentResponse) {
          this.packageEntity = packageResponse;
          this.agentResponse = agentResponse.agents;
          this.agentSelectList = this.agentResponse;
          this.filterAgents();
          this.dataLoaded = true;
        }
      });
    });
  }

  changeSelectedPackages(event: boolean, packageUUID: string) {
    if (this.agentResponse) {
      if (event) {
        let packageEntity = this.agentResponse.filter(item => item.uuid == packageUUID).at(0);
        if (packageEntity) {
          this.selectedAgents?.push(packageEntity);
        }
      } else {
        this.selectedAgents = this.selectedAgents.filter(item => item.uuid !== packageUUID);
      }
    }
  }

  createDeployments() {
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = true;
    this.deploymentCreationProgress = 0;
    this.deploymentCreationProcessStarted = true;
    this.createdDeploymentStatus = [];
    for (let selectedAgent of this.selectedAgents) {
      this.deploymentApiService.create(new CreateDeploymentRequest(selectedAgent.uuid, this.packageUUID), true).then(response => {
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> Created")
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedAgents.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> " + errorResponse.message)
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedAgents.length));
        });

    }
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = false;
    this.deploymentCreationProcessStarted = false;
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.agentResponse) {
      this.agentSelectList = this.agentResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
  }

  private filterAgents(): void {
    if (this.agentResponse) {
      this.agentResponse = this.agentResponse.filter(item => item.registrationCompleted);
      this.agentResponse = this.agentResponse.filter(item => item.operatingSystem === this.packageEntity?.targetOperatingSystem);
    }
  }

}
