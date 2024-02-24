import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api/api.service";
import {LoadingFullscreenComponent} from "../loading-fullscreen/loading-fullscreen.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-agent-detail',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    NgIf
  ],
  templateUrl: './agent-detail.component.html',
  styleUrl: './agent-detail.component.scss'
})
export class AgentDetailComponent implements OnInit {
  @Input() public agentUUID: string = "";

  public dataLoaded: boolean = false;

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
