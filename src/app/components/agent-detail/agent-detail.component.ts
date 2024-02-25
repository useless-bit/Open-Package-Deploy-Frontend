import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {LoadingFullscreenComponent} from "../loading-fullscreen/loading-fullscreen.component";
import {NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {
  MatExpansionPanel, MatExpansionPanelContent,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-agent-detail',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    NgIf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatDivider,
    MatListSubheaderCssMatStyler,
    MatCardHeader,
    MatCardSubtitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelContent
  ],
  templateUrl: './agent-detail.component.html',
  styleUrl: './agent-detail.component.scss'
})
export class AgentDetailComponent implements OnInit {
  @Input() public agentUUID: string = "";

  public dataLoaded: boolean = false;


  uuid: string = "123e4567-e89b-12d3-a456-426614174000";
  name: string = "John Doe";
  lastConnectionTime: string = "2021-06-28T12:34:56Z";
  registrationCompleted: boolean = true;
  operatingSystem: string = "Windows 10";
  operatingSystemFamily: string = "Windows";
  operatingSystemArchitecture: string = "x64";
  operatingSystemVersion: string = "10.0.12345";
  operatingSystemCodeName: string = "Redstone";
  operatingSystemBuildNumber: string = "19041";
  memory: string = "8 GB";
  cpuName: string = "Intel Core i7-6700K";
  cpuArchitecture: string = "x64";
  cpuLogicalCores: string = "8";
  cpuPhysicalCores: string = "4";
  cpuSockets: string = "1";

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getAgent(this.agentUUID).then(response => {
      if (response) {
        this.dataLoaded = true;
      }
    });
  }
}
