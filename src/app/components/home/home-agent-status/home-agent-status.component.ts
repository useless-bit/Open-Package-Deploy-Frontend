import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {ServerApiService} from "../../../service/api/server.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-home-agent-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar
  ],
  templateUrl: './home-agent-status.component.html',
  styleUrl: './home-agent-status.component.scss'
})
export class HomeAgentStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public refreshingData: boolean = false;
  public agentCount: number = 0;
  public inactiveAgentCount: number = 0;
  public outdatedAgentCount: number = 0;

  private agentChecksum: string = "";
  private agentUpdateInterval: number = 0;
  private agentEntities: AgentEntity[] = [];
  private inactiveAgentEntities: AgentEntity[] = [];
  private outdatedAgentEntities: AgentEntity[] = [];


  constructor(private serverApiService: ServerApiService,
              private agentApiService: AgentApiService) {
  }

  ngOnInit() {
    this.serverApiService.getAgentUpdateInterval().then(serverResponse => {
      this.serverApiService.getAgentChecksum().then(agentChecksumResponse => {
        this.agentApiService.getAll().then(agentResponse => {
          if (serverResponse && agentChecksumResponse && agentResponse) {
            this.agentUpdateInterval = serverResponse;
            this.agentEntities = agentResponse.agents;
            this.calculateInactiveAgents()
            this.calculateOutdatedAgents()
            this.dataLoaded = true;
            this.refreshingData = false;
          }
        })
      })
    });
  }

  calculateInactiveAgents(): void {
    this.agentCount = this.agentEntities.length;
    let targetDate = new Date();
    let increasedInterval = this.agentUpdateInterval * 1.20;
    targetDate.setSeconds(targetDate.getSeconds() - increasedInterval);
    this.inactiveAgentEntities = this.agentEntities.filter(item => item.lastConnectionTime <= targetDate || item.lastConnectionTime == "N/A");
    this.inactiveAgentCount = this.inactiveAgentEntities.length;
  }

  calculateOutdatedAgents(): void {
    this.outdatedAgentEntities = this.agentEntities.filter(item => item.checksum != this.agentChecksum);
    this.outdatedAgentCount = this.outdatedAgentEntities.length;
  }

  refreshData(): void {
    this.refreshingData = true;
    this.ngOnInit();
  }

}
