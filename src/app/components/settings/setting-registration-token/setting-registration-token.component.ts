import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {ServerApiService} from "../../../service/api/server.api.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogConfirmCancelComponent} from "../../dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../dialog-confirm-cancel/dialogConfirmCancelInput";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-setting-registration-token',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    MatDivider,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton
  ],
  templateUrl: './setting-registration-token.component.html',
  styleUrl: './setting-registration-token.component.scss'
})
export class SettingRegistrationTokenComponent implements OnInit {
  dataLoaded: boolean = false;
  registrationToken: string = "";

  constructor(private serverApiService: ServerApiService,
              private matSnackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.serverApiService.getRegistrationToken().then(response => {
      if (response) {
        this.registrationToken = response;
        this.dataLoaded = true;
      }
    });
  }

  generateNewRegistrationToken() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Generate new token",
        "Do you want to generate a new token?", "Cancel", "Generate")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false;
        this.serverApiService.generateNewRegistrationToken().then(() => {
          this.ngOnInit();
        })
      }
    });

  }

  copyRegistrationTokenIntoClipboard() {
    navigator.clipboard.writeText(this.registrationToken).then(() => {
      this.matSnackBar.open("Copied to clipboard")
    });
  }
}
