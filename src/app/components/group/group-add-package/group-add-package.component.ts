import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiErrorResponse} from "../../../service/api/reponse/generel/apiErrorResponse";
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {ServerApiService} from "../../../service/api/server.api.service";

@Component({
  selector: 'app-group-add-package',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatListOption,
    MatProgressBar,
    MatSelectionList,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf
  ],
  templateUrl: './group-add-package.component.html',
  styleUrl: './group-add-package.component.scss'
})
export class GroupAddPackageComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public packageResponse: PackageEntity[] | null = null;
  public packageSelectListToAdd: PackageEntity[] = [];
  public selectedPackagesToAdd: PackageEntity[] = [];
  public groupEntity: GroupEntity | null = null;
  public packageAddingProcessStarted: boolean = false;
  public packageAddingProgress: number = 0;
  public addedPackageStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private packageApiService: PackageApiService,
              private serverApiService: ServerApiService,
              private changeDetector: ChangeDetectorRef,
              public groupAddPackageComponentMatDialogRef: MatDialogRef<GroupAddPackageComponent>) {
  }

  ngOnInit() {
    this.groupApiService.get(this.groupUUID).then(groupResponse => {
      this.packageApiService.getAll().then(packageResponse => {
        if (packageResponse && groupResponse) {
          this.groupEntity = groupResponse;
          this.packageResponse = packageResponse.packages;
          this.filterPackages();
          this.packageSelectListToAdd = this.packageResponse;
          this.dataLoaded = true;
        }
      });
    });
  }

  changeSelectedPackages(event: boolean, agentUUID: string) {
    if (this.packageResponse) {
      if (event) {
        let packageEntity = this.packageResponse.filter(item => item.uuid == agentUUID).at(0);
        if (packageEntity && this.selectedPackagesToAdd.filter(item => item.uuid == agentUUID).length == 0) {
          this.selectedPackagesToAdd?.push(packageEntity);
        }
      } else {
        this.selectedPackagesToAdd = this.selectedPackagesToAdd.filter(item => item.uuid !== agentUUID);
      }
    }
  }

  addPackagesToGroup() {
    this.groupAddPackageComponentMatDialogRef.disableClose = true;
    this.packageAddingProgress = 0;
    this.packageAddingProcessStarted = true;
    this.addedPackageStatus = [];
    for (let selectedPackage of this.selectedPackagesToAdd) {
      this.groupApiService.addPackage(this.groupUUID, selectedPackage.uuid, true).then(() => {
          this.addedPackageStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> Added")
          this.packageAddingProgress = Math.round(100 * (this.addedPackageStatus.length / this.selectedPackagesToAdd.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.addedPackageStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> " + errorResponse.message)
          this.packageAddingProgress = Math.round(100 * (this.addedPackageStatus.length / this.selectedPackagesToAdd.length));
        });
    }
    this.serverApiService.resetDeploymentValidation().then();
    this.groupAddPackageComponentMatDialogRef.disableClose = false;
    this.packageAddingProcessStarted = false;
  }

  applySearchForPackagesToAdd(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.packageResponse) {
      this.packageSelectListToAdd = this.packageResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
    this.changeDetector.detectChanges();
  }

  addVisiblePackages() {
    let packagesToAdd = this.packageSelectListToAdd.filter(item => !this.selectedPackagesToAdd.includes(item));
    this.selectedPackagesToAdd = this.selectedPackagesToAdd.concat(packagesToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisiblePackages() {
    this.selectedPackagesToAdd = this.selectedPackagesToAdd.filter(item => !this.packageSelectListToAdd.includes(item));
    this.changeDetector.detectChanges();

  }

  isPackageInSelectedList(agentUUID: string): boolean {
    return this.selectedPackagesToAdd.filter(item => item.uuid === agentUUID).length > 0;
  }

  private filterPackages(): void {
    if (this.packageResponse) {
      this.packageResponse = this.packageResponse.filter(item => item.targetOperatingSystem === this.groupEntity?.operatingSystem);
    }
  }
}
