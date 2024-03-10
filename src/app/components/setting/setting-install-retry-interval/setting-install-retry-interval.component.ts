import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServerApiService} from "../../../service/api/server.api.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {ChangeAgentInstallRetryInterval} from "../../../service/api/request/changeAgentInstallRetryInterval";

@Component({
  selector: 'app-setting-install-retry-interval',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput
  ],
  templateUrl: './setting-install-retry-interval.component.html',
  styleUrl: './setting-install-retry-interval.component.scss'
})
export class SettingInstallRetryIntervalComponent implements OnInit {
  dataLoaded: boolean = false;
  agentInstallRetryInterval: number | null = null;

  constructor(private serverApiService: ServerApiService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.serverApiService.getAgentInstallRetryInterval().then(response => {
      if (response) {
        this.agentInstallRetryInterval = response;
        this.dataLoaded = true;
      }
    });
  }

  changeAgentInstallRetryInterval() {
    const dialogRef = this.matDialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Change agent install retry interval", "Set the new install retry interval (in seconds):", "Cancel", "Update")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        this.serverApiService.changeAgentInstallRetryInterval(new ChangeAgentInstallRetryInterval(result)).finally(() => {
          this.ngOnInit();
        })
      }
    });
  }
}
