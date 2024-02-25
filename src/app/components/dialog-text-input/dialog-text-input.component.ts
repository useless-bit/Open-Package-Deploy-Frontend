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
import {ApiService} from "../../service/api/api.service";
import {NgIf} from "@angular/common";
import {ErrorStateMatcher} from "@angular/material/core";
import {AgentUpdateRequest} from "../../service/api/request/AgentUpdateRequest";

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
  formControl = new FormControl('', [Validators.required]);
  errorStateMatcher = new CustomErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogTextInputComponent>,
              private apiService: ApiService) {
  }

  cancelUpdate(): void {
    this.dialogRef.close();
  }

  updateName() {
    this.formControl.markAllAsTouched();
    let name = this.formControl.value;
    if (this.formControl.valid && name) {
      this.apiService.updateAgent(this.data.agentUUID, new AgentUpdateRequest(name)).then(() => {
        this.dialogRef.close()
      })
    }
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
