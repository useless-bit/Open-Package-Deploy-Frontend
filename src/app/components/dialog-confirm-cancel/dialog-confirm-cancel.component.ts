import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {DialogTextInputData} from "../dialog-text-input/dialogTextInputData";
import {DialogConfirmCancelInput} from "./dialogConfirmCancelInput";

@Component({
  selector: 'app-dialog-confirm-cancel',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './dialog-confirm-cancel.component.html',
  styleUrl: './dialog-confirm-cancel.component.scss'
})
export class DialogConfirmCancelComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogConfirmCancelInput: DialogConfirmCancelInput,
              public dialogRef: MatDialogRef<DialogConfirmCancelComponent>) {
  }

  cancelButton(): void {
    this.dialogRef.close(false);
  }

  acceptButton(): void {
    this.dialogRef.close(true);
  }
}
