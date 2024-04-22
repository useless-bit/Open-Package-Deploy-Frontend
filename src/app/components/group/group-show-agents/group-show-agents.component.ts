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
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {GroupMember} from "../../../service/api/reponse/group/groupMember";
import {ApiErrorResponse} from "../../../service/api/reponse/generel/apiErrorResponse";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-group-show-agents',
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
  templateUrl: './group-show-agents.component.html',
  styleUrl: './group-show-agents.component.scss'
})
export class GroupShowAgentsComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public memberResponse: GroupMember[] | null = null;
  public visibleMembersToRemove: GroupMember[] = [];
  public selectedMembersToRemove: GroupMember[] = [];
  public memberRemovingProcessStarted: boolean = false;
  public memberRemovingProgress: number = 0;
  public memberRemovingStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private serverApiService: ServerApiService,
              private changeDetector: ChangeDetectorRef,
              public groupShowAgentsComponentMatDialogRef: MatDialogRef<GroupShowAgentsComponent>) {
  }

  ngOnInit() {
    this.groupApiService.getMembers(this.groupUUID).then(memberResponse => {
      if (memberResponse) {
        this.memberResponse = memberResponse.members;
        this.visibleMembersToRemove = this.memberResponse;
        this.dataLoaded = true;
      }
    });
  }

  changeSelectedAgents(event: boolean, agentUUID: string) {
    if (this.memberResponse) {
      if (event) {
        let agentEntity = this.memberResponse.filter(item => item.uuid == agentUUID).at(0);
        if (agentEntity && this.selectedMembersToRemove.filter(item => item.uuid == agentUUID).length == 0) {
          this.selectedMembersToRemove?.push(agentEntity);
        }
      } else {
        this.selectedMembersToRemove = this.selectedMembersToRemove.filter(item => item.uuid !== agentUUID);
      }
    }
  }

  removeMembersFromGroup() {
    this.groupShowAgentsComponentMatDialogRef.disableClose = true;
    this.memberRemovingProgress = 0;
    this.memberRemovingProcessStarted = true;
    this.memberRemovingStatus = [];
    for (let selectedAgent of this.selectedMembersToRemove) {
      this.groupApiService.removeMember(this.groupUUID, selectedAgent.uuid, true).then(() => {
          this.memberRemovingStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> Removed")
          this.memberRemovingProgress = Math.round(100 * (this.memberRemovingStatus.length / this.selectedMembersToRemove.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.memberRemovingStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> " + errorResponse.message)
          this.memberRemovingProgress = Math.round(100 * (this.memberRemovingStatus.length / this.selectedMembersToRemove.length));
        });
    }
    this.serverApiService.resetDeploymentValidation().then();
    this.groupShowAgentsComponentMatDialogRef.disableClose = false;
    this.memberRemovingProcessStarted = false;
  }

  applySearchForAgentsToRemove(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.memberResponse) {
      this.visibleMembersToRemove = this.memberResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
    this.changeDetector.detectChanges();
  }

  addVisibleAgents() {
    let agentsToAdd = this.visibleMembersToRemove.filter(item => !this.selectedMembersToRemove.includes(item));
    this.selectedMembersToRemove = this.selectedMembersToRemove.concat(agentsToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisibleAgents() {
    this.selectedMembersToRemove = this.selectedMembersToRemove.filter(item => !this.visibleMembersToRemove.includes(item));
    this.changeDetector.detectChanges();

  }

  isAgentInSelectedAgentList(agentUUID: string): boolean {
    return this.selectedMembersToRemove.filter(item => item.uuid === agentUUID).length > 0;
  }
}
