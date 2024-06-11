import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ServerApiService} from "../../../service/api/server.api.service";
import {OperatingSystem} from "../../../service/api/entity/operatingSystem";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {KeyValuePipe} from "@angular/common";
import {Highlight} from "ngx-highlightjs";
import {VariableService} from "../../../service/variable/variable.service";
import {InstallScriptUtility} from "./install-script-utility";
import {MatSnackbarOptions} from "../../../configuration/mat-snackbar/matSnackbarOptions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-agent-add-new',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatRadioButton,
    KeyValuePipe,
    Highlight,
    MatRadioGroup
  ],
  templateUrl: './agent-add-new.component.html',
  styleUrl: './agent-add-new.component.scss',
})
export class AgentAddNewComponent implements OnInit {
  public dataLoaded: boolean = false;
  public installCode = "Select a OS";
  protected readonly OperatingSystem = OperatingSystem;
  private registrationToken = "";
  private installScriptUtility: InstallScriptUtility = new InstallScriptUtility();

  constructor(private serverApiService: ServerApiService,
              private variableService: VariableService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.serverApiService.getRegistrationToken().then(response => {
      if (response) {
        this.registrationToken = response;
        this.dataLoaded = true
      }
    })
  }

  osSelectionChanged(event: MatRadioChange) {
    switch (event.value) {
      case 'Linux': {
        this.installCode = this.installScriptUtility.getLinuxInstallScript(this.registrationToken, this.variableService.backendURL);
        break;
      }
      case 'Windows': {
        this.installCode = this.installScriptUtility.getWindowsInstallScript(this.registrationToken, this.variableService.backendURL);
        break;
      }
      case 'macOS': {
        this.installCode = this.installScriptUtility.getMacOSInstallScript(this.registrationToken, this.variableService.backendURL);
        break;
      }
      default: {
        this.installCode = "Select a OS";
        break;
      }
    }
  }

  copyCodeToClipboard() {
    navigator.clipboard.writeText(this.installCode).then(() => {
      this.matSnackBar.open("Copied to clipboard", "", MatSnackbarOptions.InfoNotification)
    })
  }
}
