import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {GroupMember} from "../../../service/api/reponse/group/groupMember";
import {GroupApiService} from "../../../service/api/group.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiErrorResponse} from "../../../service/api/reponse/apiErrorResponse";

@Component({
  selector: 'app-group-show-packages',
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
  templateUrl: './group-show-packages.component.html',
  styleUrl: './group-show-packages.component.scss'
})
export class GroupShowPackagesComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public memberResponse: GroupMember[] | null = null;
  public visibleMembers: GroupMember[] = [];
  public selectedMembers: GroupMember[] = [];
  public deploymentCreationProcessStarted: boolean = false;
  public deploymentCreationProgress: number = 0;
  public createdDeploymentStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private changeDetector: ChangeDetectorRef,
              public packageCreateDeploymentComponentMatDialogRef: MatDialogRef<GroupShowPackagesComponent>) {
  }

  ngOnInit() {
    this.groupApiService.getPackages(this.groupUUID).then(memberResponse => {
      if (memberResponse) {
        this.memberResponse = memberResponse.packages;
        this.visibleMembers = this.memberResponse;
        this.dataLoaded = true;
      }
    });
  }

  changeSelectedAgents(event: boolean, agentUUID: string) {
    if (this.memberResponse) {
      if (event) {
        let packageEntity = this.memberResponse.filter(item => item.uuid == agentUUID).at(0);
        if (packageEntity && this.selectedMembers.filter(item => item.uuid == agentUUID).length == 0) {
          this.selectedMembers?.push(packageEntity);
        }
      } else {
        this.selectedMembers = this.selectedMembers.filter(item => item.uuid !== agentUUID);
      }
    }
  }

  createDeploymentsForPackage() {
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = true;
    this.deploymentCreationProgress = 0;
    this.deploymentCreationProcessStarted = true;
    this.createdDeploymentStatus = [];
    for (let selectedAgent of this.selectedMembers) {
      this.groupApiService.removePackage(this.groupUUID, selectedAgent.uuid, true).then(() => {
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> Removed")
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedMembers.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.createdDeploymentStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> " + errorResponse.message)
          this.deploymentCreationProgress = Math.round(100 * (this.createdDeploymentStatus.length / this.selectedMembers.length));
        });
    }
    this.packageCreateDeploymentComponentMatDialogRef.disableClose = false;
    this.deploymentCreationProcessStarted = false;
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.memberResponse) {
      this.visibleMembers = this.memberResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
    this.changeDetector.detectChanges();
  }

  addVisibleAgents() {
    let agentsToAdd = this.visibleMembers.filter(item => !this.selectedMembers.includes(item));
    this.selectedMembers = this.selectedMembers.concat(agentsToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisibleAgents() {
    this.selectedMembers = this.selectedMembers.filter(item => !this.visibleMembers.includes(item));
    this.changeDetector.detectChanges();

  }

  isAgentInSelectedAgentList(agentUUID: string): boolean {
    return this.selectedMembers.filter(item => item.uuid === agentUUID).length > 0;
  }
}
