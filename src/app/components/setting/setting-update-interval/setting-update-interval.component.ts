import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServerApiService} from "../../../service/api/server.api.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {ServerAgentUpdateIntervalRequest} from "../../../service/api/request/server/serverAgentUpdateIntervalRequest";

@Component({
  selector: 'app-setting-update-interval',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    NgIf,
    MatButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './setting-update-interval.component.html',
  styleUrl: './setting-update-interval.component.scss'
})
export class SettingUpdateIntervalComponent implements OnInit {
  dataLoaded: boolean = false;
  agentUpdateInterval: number | null = null;

  constructor(private serverApiService: ServerApiService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.serverApiService.getAgentUpdateInterval().then(response => {
      if (response) {
        this.agentUpdateInterval = response;
        this.dataLoaded = true;
      }
    });
  }

  changeAgentUpdateInterval() {
    const dialogRef = this.matDialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Change agent update interval", "Set the new update interval (in seconds):", "Cancel", "Update", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.serverApiService.changeAgentUpdateInterval(new ServerAgentUpdateIntervalRequest(result)).finally(() => {
          this.ngOnInit();
        })
      }
    });
  }

}
