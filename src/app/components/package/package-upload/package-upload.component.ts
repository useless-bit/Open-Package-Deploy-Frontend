import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {OperatingSystem} from "../../../service/api/entity/operatingSystem";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIcon} from "@angular/material/icon";
import {Subscription} from "rxjs";
import {ApiService} from "../../../service/api/api.service";
import {AddNewPackageRequest} from "../../../service/api/request/addNewPackageRequest";
import {HttpEventType, HttpStatusCode} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-package-upload',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInputModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatToolbar,
    MatButton,
    MatProgressBar,
    MatIcon
  ],
  templateUrl: './package-upload.component.html',
  styleUrl: './package-upload.component.scss'
})
export class PackageUploadComponent implements OnInit {
  public uploadProgress: number | null = null;
  public uploadSub: Subscription | null = null;
  public uploadErrorMessage: string | null = null;

  public file: File | null = null;
  formControlNameInput: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  formControlChecksumInput: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  formControlOsSelect: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);


  formControlFileInput: FormControl = new FormControl({
    value: '', disabled: true
  }, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  protected readonly OperatingSystem = OperatingSystem;
  protected readonly Object = Object;

  constructor(private apiService: ApiService,
              public dialogRef: MatDialogRef<PackageUploadComponent>) {
  }

  ngOnInit() {
    this.formControlNameInput.markAllAsTouched();
    this.formControlChecksumInput.markAllAsTouched();
    this.formControlOsSelect.markAllAsTouched();
  }

  onFileSelected(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      if (this.file) {
        this.formControlFileInput.setValue(this.file.name)
      }
    }
  }

  startUpload() {
    this.uploadErrorMessage = null;
    this.formControlNameInput.markAllAsTouched();
    this.formControlChecksumInput.markAllAsTouched();
    this.formControlOsSelect.markAllAsTouched();
    if (this.formControlNameInput.valid && this.formControlChecksumInput.valid && this.formControlOsSelect.valid && this.file) {
      this.dialogRef.disableClose = true;
      this.formControlNameInput.disable();
      this.formControlChecksumInput.disable();
      this.formControlOsSelect.disable();
      let formData: FormData = new FormData();
      let addNewPackageRequest: AddNewPackageRequest = new AddNewPackageRequest(this.formControlNameInput.value, this.formControlChecksumInput.value, this.formControlOsSelect.value.toUpperCase())
      formData.append("addNewPackageRequest", new Blob([JSON.stringify(addNewPackageRequest)], {type: 'application/json'}));
      formData.append("multipartFile", this.file)
      let upload = this.apiService.addNewPackage(formData);

      this.uploadSub = upload.subscribe({
        next: (value: any) => {
          if (value.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (value.loaded / value.total));
          } else if (value.type == HttpEventType.ResponseHeader && value.status == HttpStatusCode.Ok) {
            this.dialogRef.close();
          }
        },
        error: (error: any) => {
          this.uploadErrorMessage = error.error.message;
          this.cancelUpload();
        }
      });

    }
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.uploadProgress = null;
      this.uploadSub = null;
    }
    this.dialogRef.disableClose = false;
    this.formControlNameInput.enable();
    this.formControlChecksumInput.enable();
    this.formControlOsSelect.enable();
  }
}
