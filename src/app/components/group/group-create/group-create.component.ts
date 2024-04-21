import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {OperatingSystem} from '../../../service/api/entity/operatingSystem';
import {DeploymentCreateComponent} from "../../deployment/deployment-create/deployment-create.component";
import {LoadingComponent} from "../../loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatButton} from "@angular/material/button";
import {MatError, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {GroupApiService} from "../../../service/api/group.api.service";
import {CreateEmptyGroupRequest} from "../../../service/api/request/group/createEmptyGroupRequest";

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [
    LoadingComponent,
    MatFormField,
    NgIf,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    NgForOf,
    NgxMatSelectSearchModule,
    MatButton,
    MatError,
    MatLabel,
    MatInput
  ],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss'
})
export class GroupCreateComponent {
  public targetOs: OperatingSystem = OperatingSystem.Unknown;
  formControlOsSelect: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);
  formControlGroupName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);
  formControlGroupDescription: FormControl = new FormControl('', []);
  protected readonly OperatingSystem = OperatingSystem;
  protected readonly Object = Object;

  constructor(private groupApiService: GroupApiService,
              public dialogRef: MatDialogRef<DeploymentCreateComponent>) {
  }


  createGroup() {
    this.formControlOsSelect.markAllAsTouched();
    this.formControlGroupName.markAllAsTouched();

    if (this.formControlOsSelect.valid && this.formControlGroupName.valid) {
      this.groupApiService.create(new CreateEmptyGroupRequest(this.formControlGroupName.value, this.formControlGroupDescription.value, this.formControlOsSelect.value.toUpperCase()), false).then(() => {
        this.dialogRef.close();
      })
    }
  }

  osTargetChange(event: MatSelectChange) {
    if (event.value !== OperatingSystem.Unknown) {
      this.targetOs = event.value.toUpperCase();
    } else {
      this.targetOs = OperatingSystem.Unknown;
    }
  }

}
