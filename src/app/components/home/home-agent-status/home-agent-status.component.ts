import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {ServerApiService} from "../../../service/api/server.api.service";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArrayPopupComponent} from "../../array-popup/array-popup.component";
import {MatButton} from "@angular/material/button";
import {ArrayPopupInput} from "../../array-popup/arrayPopupInput";

@Component({
  selector: 'app-home-agent-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar,
    MatButton
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
  private dialogRef: MatDialogRef<ArrayPopupComponent> | undefined;


  constructor(private serverApiService: ServerApiService,
              private agentApiService: AgentApiService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.serverApiService.getAgentUpdateInterval().then(serverResponse => {
      this.serverApiService.getAgentChecksum().then(agentChecksumResponse => {
        this.agentApiService.getAll().then(agentResponse => {
          if (serverResponse && agentChecksumResponse && agentResponse) {
            this.agentUpdateInterval = serverResponse;
            this.agentEntities = agentResponse.agents;
            this.agentChecksum = agentChecksumResponse;
            this.calculateInactiveAgents()
            this.calculateOutdatedAgents()
            this.dataLoaded = true;
            this.refreshingData = false;
            this.updatePopupData();
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

  showInactiveAgentPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Inactive Agents", this.inactiveAgentEntities.map(item => item.name + " | " + item.uuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  showOutdatedAgentPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Outdated Agents", this.outdatedAgentEntities.map(item => item.name + " | " + item.uuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  updatePopupData(): void {
    if (this.dialogRef) {
      if (this.dialogRef.componentInstance.arrayPopupInput.title == "Inactive Agents") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.inactiveAgentEntities.map(item => item.name + " | " + item.uuid);
      } else if (this.dialogRef.componentInstance.arrayPopupInput.title == "Outdated Agents") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.outdatedAgentEntities.map(item => item.name + " | " + item.uuid);

      }
    }
  }
}
