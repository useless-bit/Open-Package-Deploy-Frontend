import {Component, OnInit} from '@angular/core';
import {LoadingFullscreenComponent} from "../../loading-fullscreen/loading-fullscreen.component";
import {NgForOf, NgIf} from "@angular/common";
import {OperatingSystem} from "../../../service/api/entity/operatingSystem";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {CreateDeploymentRequest} from "../../../service/api/request/createDeploymentRequest";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {PackageApiService} from "../../../service/api/package.api.service";
import {DeploymentApiService} from "../../../service/deployment.api.service";

@Component({
  selector: 'app-deployment-create',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    NgIf,
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatProgressBar,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    NgxMatSelectSearchModule
  ],
  templateUrl: './deployment-create.component.html',
  styleUrl: './deployment-create.component.scss'
})
export class DeploymentCreateComponent implements OnInit {
  public dataLoaded: boolean = false;
  public agentList: AgentEntity[] | null = null;
  public filteredAgents: AgentEntity[] | null = null;
  public packageList: PackageEntity[] | null = null;
  public filteredPackages: PackageEntity[] | null = null;
  public targetOs: OperatingSystem = OperatingSystem.Unknown;
  formControlOsSelect: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);
  formControlPackageSelect: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);
  formControlPackageSelectSearch: FormControl = new FormControl('');
  formControlAgentSelect: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\s*\S.*$/)]);
  formControlAgentSelectSearch: FormControl = new FormControl('');
  formControlExpectedReturnValueInput: FormControl = new FormControl('');
  protected readonly OperatingSystem = OperatingSystem;
  protected readonly Object = Object;

  constructor(private agentApiService: AgentApiService,
              private packageApiService: PackageApiService,
              private deploymentApiService: DeploymentApiService,
              public dialogRef: MatDialogRef<DeploymentCreateComponent>) {
  }

  ngOnInit() {
    this.formControlPackageSelect.disable();
    this.formControlAgentSelect.disable();
    this.agentApiService.getAll().then(agentResponse => {
      this.packageApiService.getAll().then(packageResponse => {
        if (agentResponse && packageResponse) {
          this.agentList = agentResponse.agents;
          this.filteredAgents = this.agentList;
          this.packageList = packageResponse.packages;
          this.filteredPackages = this.packageList;
          this.dataLoaded = true;
        }
      });
    });
    this.formControlAgentSelectSearch.valueChanges.subscribe(() => {
      this.filterAgents();
    })
    this.formControlPackageSelectSearch.valueChanges.subscribe(() => {
      this.filterPackages();
    })
  }

  createDeployment() {
    this.formControlOsSelect.markAllAsTouched();
    this.formControlPackageSelect.markAllAsTouched();
    this.formControlAgentSelect.markAllAsTouched();

    if (this.formControlOsSelect.valid && this.formControlPackageSelect.valid && this.formControlAgentSelect.valid) {
      this.deploymentApiService.create(new CreateDeploymentRequest(this.formControlAgentSelect.value, this.formControlPackageSelect.value, this.formControlExpectedReturnValueInput.value.trim())).then(() => {
        this.dialogRef.close();
      })
    }
  }

  osTargetChange(event: MatSelectChange) {
    if (event.value !== OperatingSystem.Unknown) {
      this.targetOs = event.value.toUpperCase();
      this.formControlPackageSelect.reset();
      this.formControlPackageSelect.enable();
      this.formControlAgentSelect.reset();
      this.formControlAgentSelect.enable();
    } else {
      this.targetOs = OperatingSystem.Unknown;
      this.formControlPackageSelect.reset();
      this.formControlPackageSelect.disable();
      this.formControlAgentSelect.reset();
      this.formControlAgentSelect.disable();
    }
  }

  protected filterAgents() {
    if (!this.agentList) {
      return;
    }
    let search = this.formControlAgentSelectSearch.value;
    this.filteredAgents = this.agentList.filter(agent => agent.name.includes(search));
  }

  protected filterPackages() {
    if (!this.packageList) {
      return;
    }
    let search = this.formControlPackageSelectSearch.value;
    this.filteredPackages = this.packageList.filter(package_item => package_item.name.includes(search));
  }
}
