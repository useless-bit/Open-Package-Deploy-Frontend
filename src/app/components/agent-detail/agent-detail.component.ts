import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {LoadingFullscreenComponent} from "../loading-fullscreen/loading-fullscreen.component";
import {NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {AgentEntity} from "../../service/api/entity/agentEntity";
import {MatDialog} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../dialog-text-input/dialog-text-input.component";

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
  public agentEntity: AgentEntity | null = null;

  constructor(private apiService: ApiService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataLoaded = false;
    this.apiService.getAgent(this.agentUUID).then(response => {
      if (response) {
        this.agentEntity = response;
        this.dataLoaded = true;
      }
    });
  }

  updateAgentName() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: {agentName: this.agentEntity?.name, agentUUID: this.agentUUID},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}

