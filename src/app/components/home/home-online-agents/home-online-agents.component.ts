import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {ServerApiService} from "../../../service/api/server.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";

@Component({
  selector: 'app-home-online-agents',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput
  ],
  templateUrl: './home-online-agents.component.html',
  styleUrl: './home-online-agents.component.scss'
})
export class HomeOnlineAgentsComponent implements OnInit {
  public dataLoaded: boolean = false;
  public agentCount: number = 0;
  public activeAgentCount: number = 0;

  private agentUpdateInterval: number = 0;
  private agentEntities: AgentEntity[] = [];
  private activeAgentEntities: AgentEntity[] = [];

  constructor(private serverApiService: ServerApiService,
              private agentApiService: AgentApiService) {
  }

  ngOnInit() {
    this.serverApiService.getAgentUpdateInterval().then(serverResponse => {
      this.agentApiService.getAll().then(agentResponse => {
        if (serverResponse && agentResponse) {
          this.agentUpdateInterval = serverResponse;
          this.agentEntities = agentResponse.agents;
          this.calculateActiveAgents()
          this.dataLoaded = true;
        }
      })
    });
  }

  calculateActiveAgents(): void {
    this.agentCount = this.agentEntities.length;
    let targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() - this.agentUpdateInterval);
    this.activeAgentEntities = this.agentEntities.filter(item => item.lastConnectionTime >= targetDate);
    this.activeAgentCount = this.activeAgentEntities.length;
  }
}
