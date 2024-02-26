import {Component, Input} from '@angular/core';
import {LoadingFullscreenComponent} from "../../loading-fullscreen/loading-fullscreen.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {NgIf} from "@angular/common";
import {ApiService} from "../../../service/api/api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {DialogConfirmCancelComponent} from "../../dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../dialog-confirm-cancel/dialogConfirmCancelInput";
import {PackageEntity} from "../../../service/api/entity/packageEntity";

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    MatButton,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatLine,
    MatList,
    MatListItem,
    NgIf
  ],
  templateUrl: './package-detail.component.html',
  styleUrl: './package-detail.component.scss'
})
export class PackageDetailComponent {
  @Input() public packageUUID: string = "";

  public dataLoaded: boolean = false;
  public packageEntity: PackageEntity | null = null;

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<PackageDetailComponent>) {
  }

  ngOnInit() {
    this.apiService.getPackage(this.packageUUID).then(response => {
      if (response) {
        this.packageEntity = response;
        this.dataLoaded = true;
      }
    });
  }

  updatePackageName() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update name for Package: " + this.packageEntity?.name,
        "Enter new name:", "Cancel", "Update")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        //this.apiService.updateAgent(this.packageUUID, new AgentUpdateRequests(result)).then(() => {
        //  this.ngOnInit();
        //})
      }
    });
  }

  deletePackage() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete Package: " + this.packageEntity?.name,
        "Do you really want to delete the Package?", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataLoaded = false
        //this.apiService.deleteAgent(this.packageUUID).then(() => {
        //  this.dialogRef.close()
        //})
      }
    });
  }
}
