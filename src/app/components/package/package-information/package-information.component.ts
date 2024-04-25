import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {NgIf} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogTextInputComponent} from "../../dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../dialog-text-input/dialogTextInputData";
import {DialogConfirmCancelComponent} from "../../dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../dialog-confirm-cancel/dialogConfirmCancelInput";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageUpdateRequest} from "../../../service/api/request/package/packageUpdateRequest";
import {PackageApiService} from "../../../service/api/package.api.service";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {PackageUpdateContentComponent} from "../package-update-content/package-update-content.component";
import {PackageUpdateContentComponentInput} from "../package-update-content/packageUpdateContentComponentInput";

@Component({
  selector: 'app-package-information',
  standalone: true,
  imports: [
    LoadingComponent,
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
  templateUrl: './package-information.component.html',
  styleUrl: './package-information.component.scss'
})
export class PackageInformationComponent {
  @Input() public packageEntity!: PackageEntity;
  @Output() reloadDataFunction = new EventEmitter<any>();

  constructor(private packageApiService: PackageApiService,
              private deploymentApiService: DeploymentApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<PackageInformationComponent>) {
  }

  updatePackageName() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update name for Package: " + this.packageEntity.name,
        "Enter new name:", "Cancel", "Update", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.packageApiService.update(this.packageEntity.uuid, new PackageUpdateRequest(result, null)).then(() => {
          this.reloadDataFunction.emit();
        })
      }
    });
  }

  updatePackageExpectedReturnValue() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update expected return value for Package: " + this.packageEntity?.name,
        "Enter new expected return value: (Wont affect completed deployments, until redeployed)", "Cancel", "Update", true)
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.packageApiService.update(this.packageEntity.uuid, new PackageUpdateRequest(null, result)).then(() => {
        this.reloadDataFunction.emit();
      })
    });
  }

  deletePackage() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete Package: " + this.packageEntity?.name,
        "Do you really want to delete the Package?", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.packageApiService.delete(this.packageEntity.uuid).then(() => {
          this.dialogRef.close()
        })
      }
    });
  }

  resetAllDeployments() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Reset all deployments for: " + this.packageEntity?.name,
        "Do you want to reset all deployments for this package?", "Cancel", "Reset")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deploymentApiService.resetForPackage(this.packageEntity.uuid).then(() => {
          this.reloadDataFunction.emit();
        })
      }
    });

  }

  updatePackageContent() {
    if (this.packageEntity) {
      this.dialog.open(PackageUpdateContentComponent, {
        data: new PackageUpdateContentComponentInput(this.packageEntity),
        panelClass: "main-popup"
      })
        .afterClosed().subscribe(() => {
        this.reloadDataFunction.emit();
      });
    }
  }

}
