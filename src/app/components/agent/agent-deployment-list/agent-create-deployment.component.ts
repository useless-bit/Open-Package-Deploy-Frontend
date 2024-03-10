import {Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatDialogRef} from "@angular/material/dialog";
import {MatProgressBar} from "@angular/material/progress-bar";
import {CreateDeploymentRequest} from "../../../service/api/request/createDeploymentRequest";
import {ApiErrorResponse} from "../../../service/api/reponse/apiErrorResponse";

@Component({
  selector: 'app-agent-create-deployment',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatFormField,
    MatButton,
    MatStepperNext,
    MatInput,
    MatLabel,
    MatStepperPrevious,
    MatDivider,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    NgForOf,
    MatColumnDef,
    MatHeaderCellDef,
    MatSelectionList,
    MatListOption,
    KeyValuePipe,
    MatList,
    MatListItem,
    MatProgressBar
  ],
  templateUrl: './agent-create-deployment.component.html',
  styleUrl: './agent-create-deployment.component.scss'
})
export class AgentCreateDeploymentComponent implements OnInit {
  @Input() public agentUUID: string = "";

  public dataLoaded: boolean = false;
  public agentEntity: AgentEntity | null = null;
  public packageResponse: PackageEntity[] | null = null;
  public selectedPackages: PackageEntity[] = [];
  public deploymentCreationProcessStarted: boolean = false;
  public deploymentCreationProgress: number = 0;
  public createdDeploymentStatus: string[] = [];


  constructor(private deploymentApiService: DeploymentApiService,
              private packageApiService: PackageApiService,
              private agentApiService: AgentApiService,
              public agentDeploymentListComponentMatDialogRef: MatDialogRef<AgentCreateDeploymentComponent>) {
  }

  ngOnInit() {
    this.agentApiService.get(this.agentUUID).then(agentResponse => {
      this.packageApiService.getAll().then(packageResponse => {
        if (agentResponse && packageResponse) {
          this.agentEntity = agentResponse;
          this.packageResponse = packageResponse.packages;
          this.filterPackages();
          this.dataLoaded = true;
        }
      });
    });
  }

  private filterPackages(): void {
    if (this.packageResponse) {
      this.packageResponse = this.packageResponse.filter(item => item.packageStatus !== "MARKED_AS_DELETED");
      this.packageResponse = this.packageResponse.filter(item => item.targetOperatingSystem === this.agentEntity?.operatingSystem);
    }
  }

  changeSelectedPackages(event: boolean, packageUUID: string) {
    if (this.packageResponse) {
      if (event) {
        let packageEntity = this.packageResponse.filter(item => item.uuid == packageUUID).at(0);
        if (packageEntity) {
          this.selectedPackages?.push(packageEntity);
        }
      } else {
        this.selectedPackages = this.selectedPackages.filter(item => item.uuid !== packageUUID);
      }
    }
  }

  createDeployments() {
    this.agentDeploymentListComponentMatDialogRef.disableClose = true;
    this.deploymentCreationProgress = 0;
    this.deploymentCreationProcessStarted = true;
    this.createdDeploymentStatus = [];
    for (let selectedPackage of this.selectedPackages) {
      this.deploymentApiService.create(new CreateDeploymentRequest(this.agentUUID, selectedPackage.uuid), true).then(response => {
          this.createdDeploymentStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> Created")
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedPackages.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.createdDeploymentStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> " + errorResponse.message)
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedPackages.length));
        });

    }
    this.agentDeploymentListComponentMatDialogRef.disableClose = false;
    this.deploymentCreationProcessStarted = false;
  }
}
