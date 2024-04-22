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
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiErrorResponse} from "../../../service/api/reponse/generel/apiErrorResponse";
import {GroupApiService} from "../../../service/api/group.api.service";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-group-add-agent',
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
  templateUrl: './group-add-agent.component.html',
  styleUrl: './group-add-agent.component.scss'
})
export class GroupAddAgentComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public agentResponse: AgentEntity[] | null = null;
  public agentSelectList: AgentEntity[] = [];
  public selectedAgents: AgentEntity[] = [];
  public groupEntity: GroupEntity | null = null;
  public memberAddingProcessStarted: boolean = false;
  public memberAddingProgress: number = 0;
  public addingMemberStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private agentApiService: AgentApiService,
              private serverApiService: ServerApiService,
              private changeDetector: ChangeDetectorRef,
              public addAgentComponentMatDialogRef: MatDialogRef<GroupAddAgentComponent>) {
  }

  ngOnInit() {
    this.groupApiService.get(this.groupUUID).then(groupResponse => {
      this.agentApiService.getAll().then(agentResponse => {
        if (agentResponse && groupResponse) {
          this.groupEntity = groupResponse;
          this.agentResponse = agentResponse.agents;
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

  addAgentsToGroup() {
    this.addAgentComponentMatDialogRef.disableClose = true;
    this.memberAddingProgress = 0;
    this.memberAddingProcessStarted = true;
    this.addingMemberStatus = [];
    for (let selectedAgent of this.selectedAgents) {
      this.groupApiService.addMember(this.groupUUID, selectedAgent.uuid, true).then(() => {
          this.addingMemberStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> Added")
          this.memberAddingProgress = Math.round(100 * (this.addingMemberStatus.length / this.selectedAgents.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.addingMemberStatus.push(selectedAgent.name + " | " + selectedAgent.uuid + " -> " + errorResponse.message)
          this.memberAddingProgress = Math.round(100 * (this.addingMemberStatus.length / this.selectedAgents.length));
        });
    }
    this.serverApiService.resetDeploymentValidation().then();
    this.addAgentComponentMatDialogRef.disableClose = false;
    this.memberAddingProcessStarted = false;
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
      this.agentResponse = this.agentResponse.filter(item => item.registrationCompleted);
      this.agentResponse = this.agentResponse.filter(item => item.operatingSystem === this.groupEntity?.operatingSystem);
    }
  }
}
