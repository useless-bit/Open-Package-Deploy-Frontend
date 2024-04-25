import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {NgIf} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {DialogConfirmCancelComponent} from "../../../shared-components/dialog-confirm-cancel/dialog-confirm-cancel.component";
import {DialogConfirmCancelInput} from "../../../shared-components/dialog-confirm-cancel/dialogConfirmCancelInput";
import {DialogTextInputComponent} from "../../../shared-components/dialog-text-input/dialog-text-input.component";
import {DialogTextInputData} from "../../../shared-components/dialog-text-input/dialogTextInputData";
import {GroupUpdateRequest} from "../../../service/api/request/group/groupUpdateRequest";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-group-information',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatLine,
    MatList,
    MatListItem,
    NgIf
  ],
  templateUrl: './group-information.component.html',
  styleUrl: './group-information.component.scss'
})
export class GroupInformationComponent {
  @Input() public groupEntity!: GroupEntity;
  @Output() reloadDataFunction = new EventEmitter<any>();

  constructor(private groupApiService: GroupApiService,
              private serverApiService: ServerApiService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<GroupInformationComponent>) {
  }

  renameGroup() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update name for group: " + this.groupEntity?.name,
        "Enter new name:", "Cancel", "Update", false)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupApiService.update(this.groupEntity.uuid, new GroupUpdateRequest(result, this.groupEntity?.description)).then(() => {
          this.reloadDataFunction.emit();
        })
      }
    });
  }

  changeGroupDescription() {
    const dialogRef = this.dialog.open(DialogTextInputComponent, {
      data: new DialogTextInputData("Update description for group: " + this.groupEntity?.name,
        "Enter new description:", "Cancel", "Update", true)
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.groupApiService.update(this.groupEntity.uuid, new GroupUpdateRequest(null, result)).then(() => {
        this.reloadDataFunction.emit();
      });
    });

  }

  deleteGroup() {
    const dialogRef = this.dialog.open(DialogConfirmCancelComponent, {
      data: new DialogConfirmCancelInput("Delete group " + this.groupEntity?.name,
        "Do you really want to delete this group?", "Cancel", "Delete")
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupApiService.delete(this.groupEntity.uuid).then(() => {
          this.serverApiService.resetDeploymentValidation().then(() => {
            this.dialogRef.close()
          })
        })
      }
    });

  }
}
