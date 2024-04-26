import {Component, Inject, OnInit} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
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
import {HttpEventType, HttpStatusCode} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PackageApiService} from "../../../service/api/package.api.service";
import {PackageUpdateContentComponentInput} from "./packageUpdateContentComponentInput";
import {PackageUpdateContentRequest} from "../../../service/api/request/package/packageUpdateContentRequest";
import {PackageEntity} from "../../../service/api/entity/packageEntity";

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
    MatIcon,
    KeyValuePipe
  ],
  templateUrl: './package-update-content.component.html',
  styleUrl: './package-update-content.component.scss'
})
export class PackageUpdateContentComponent implements OnInit {
  public packageEntity: PackageEntity;
  public uploadProgress: number | null = null;
  public uploadSub: Subscription | null = null;
  public uploadErrorMessage: string | null = null;

  public file: File | null = null;
  formControlChecksumInput: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);


  formControlFileInput: FormControl = new FormControl({
    value: '',
    disabled: true
  }, [Validators.required, Validators.pattern(/^\s*\S.*$/)]);

  constructor(@Inject(MAT_DIALOG_DATA) public packageUpdateContentComponentInput: PackageUpdateContentComponentInput,
              private packageApiService: PackageApiService,
              public packageUpdateContentComponentMatDialogRef: MatDialogRef<PackageUpdateContentComponent>) {
    this.packageEntity = packageUpdateContentComponentInput.packageEntity;
  }

  ngOnInit() {
    this.formControlChecksumInput.markAllAsTouched();
  }

  getKeyForOperatingSystem(value: string): string {
    return <string>Object.keys(OperatingSystem).find(key => OperatingSystem[key as keyof typeof OperatingSystem] === value);
  }

  onFileSelected(event: any) {
    if (event?.target?.files[0]) {
      this.file = event.target.files[0];
      if (this.file) {
        this.formControlFileInput.setValue(this.file.name)
      }
    }
  }

  startUploadNewContent() {
    this.uploadErrorMessage = null;
    this.formControlChecksumInput.markAllAsTouched();
    if (this.formControlChecksumInput.valid && this.file) {
      this.packageUpdateContentComponentMatDialogRef.disableClose = true;
      this.formControlChecksumInput.disable();
      let formData: FormData = new FormData();
      let updatePackageContentRequest: PackageUpdateContentRequest = new PackageUpdateContentRequest(this.formControlChecksumInput.value)
      formData.append("packageUpdateRequest", new Blob([JSON.stringify(updatePackageContentRequest)], {type: 'application/json'}));
      formData.append("multipartFile", this.file)
      let upload = this.packageApiService.updateContent(this.packageEntity.uuid, formData);

      this.uploadSub = upload.subscribe({
        next: (value: any) => {
          if (value.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (value.loaded / value.total));
          } else if (value.type == HttpEventType.ResponseHeader && value.status == HttpStatusCode.Ok) {
            this.packageUpdateContentComponentMatDialogRef.close();
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
    this.packageUpdateContentComponentMatDialogRef.disableClose = false;
    this.formControlChecksumInput.enable();
  }
}
