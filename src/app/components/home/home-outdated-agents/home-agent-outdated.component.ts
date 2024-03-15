import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServerApiService} from "../../../service/api/server.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";

import {AgentEntity} from "../../../service/api/entity/agentEntity";

@Component({
  selector: 'app-home-agent-outdated',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './home-agent-outdated.component.html',
  styleUrl: './home-agent-outdated.component.scss'
})
export class HomeAgentOutdatedComponent implements OnInit {
  public dataLoaded: boolean = false;
  public agentCount: number = 0;
  public outdatedAgentCount: number = 0;

  private agentChecksum: string = "";
  private agentEntities: AgentEntity[] = [];
  private outdatedAgentEntities: AgentEntity[] = [];


  constructor(private serverApiService: ServerApiService,
              private agentApiService: AgentApiService) {
  }

  ngOnInit() {
    this.serverApiService.getAgentChecksum().then(agentChecksumResponse => {
      this.agentApiService.getAll().then(agentResponse => {
        if (agentChecksumResponse && agentResponse) {
          this.agentChecksum = agentChecksumResponse;
          this.agentEntities = agentResponse.agents;
          this.calculateOutdatedAgents()
          this.dataLoaded = true;
        }
      })
    });
  }

  calculateOutdatedAgents(): void {
    this.agentCount = this.agentEntities.length;
    this.outdatedAgentEntities = this.agentEntities.filter(item => item.checksum != this.agentChecksum);
    this.outdatedAgentCount = this.outdatedAgentEntities.length;
  }

}

