import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ErrorStateMatcher} from "@angular/material/core";
import {DialogTextInputData} from "./dialogTextInputData";

@Component({
  selector: 'app-dialog-text-input',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatInput,
    MatDialogClose,
    NgIf,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-text-input.component.html',
  styleUrl: './dialog-text-input.component.scss'
})
export class DialogTextInputComponent {
  formControl: FormControl;
  errorStateMatcher = new CustomErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogTextInputData: DialogTextInputData,
              public dialogRef: MatDialogRef<DialogTextInputComponent>) {
    if (!dialogTextInputData.allowEmptyValue) {
      this.formControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)])
    } else
      this.formControl = new FormControl();
  }

  cancelButton(): void {
    this.dialogRef.close();
  }

  acceptButton(): void {
    this.formControl.markAllAsTouched();
    let name = this.formControl.value?.trim();
    if (this.formControl.valid && (this.dialogTextInputData.allowEmptyValue || name)) {
      this.dialogRef.close(name);
    }
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
