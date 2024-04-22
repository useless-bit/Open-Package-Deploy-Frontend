import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {GroupApiService} from "../../../service/api/group.api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiErrorResponse} from "../../../service/api/reponse/generel/apiErrorResponse";
import {ServerApiService} from "../../../service/api/server.api.service";
import {GroupPackage} from "../../../service/api/reponse/group/groupPackage";

@Component({
  selector: 'app-group-show-packages',
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
  templateUrl: './group-show-packages.component.html',
  styleUrl: './group-show-packages.component.scss'
})
export class GroupShowPackagesComponent implements OnInit {
  @Input() public groupUUID: string = "";

  public dataLoaded: boolean = false;
  public groupPackageResponse: GroupPackage[] | null = null;
  public visiblePackagesToRemove: GroupPackage[] = [];
  public selectedPackagesToRemove: GroupPackage[] = [];
  public packageRemovingProcessStarted: boolean = false;
  public packageRemovingProgress: number = 0;
  public packageRemovingStatus: string[] = [];


  constructor(private groupApiService: GroupApiService,
              private serverApiService: ServerApiService,
              private changeDetector: ChangeDetectorRef,
              public groupShowPackagesComponentMatDialogRef: MatDialogRef<GroupShowPackagesComponent>) {
  }

  ngOnInit() {
    this.groupApiService.getPackages(this.groupUUID).then(memberResponse => {
      if (memberResponse) {
        this.groupPackageResponse = memberResponse.packages;
        this.visiblePackagesToRemove = this.groupPackageResponse;
        this.dataLoaded = true;
      }
    });
  }

  changeSelectedPackages(event: boolean, agentUUID: string) {
    if (this.groupPackageResponse) {
      if (event) {
        let packageEntity = this.groupPackageResponse.filter(item => item.uuid == agentUUID).at(0);
        if (packageEntity && this.selectedPackagesToRemove.filter(item => item.uuid == agentUUID).length == 0) {
          this.selectedPackagesToRemove?.push(packageEntity);
        }
      } else {
        this.selectedPackagesToRemove = this.selectedPackagesToRemove.filter(item => item.uuid !== agentUUID);
      }
    }
  }

  async removePackagesFromGroup() {
    this.groupShowPackagesComponentMatDialogRef.disableClose = true;
    this.packageRemovingProgress = 0;
    this.packageRemovingProcessStarted = true;
    this.packageRemovingStatus = [];
    for (let selectedPackage of this.selectedPackagesToRemove) {
      await this.groupApiService.removePackage(this.groupUUID, selectedPackage.uuid, true).then(() => {
          this.packageRemovingStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> Removed")
          this.packageRemovingProgress = Math.round(100 * (this.packageRemovingStatus.length / this.selectedPackagesToRemove.length));

        },
        error => {
          let errorResponse = error.error as ApiErrorResponse;
          this.packageRemovingStatus.push(selectedPackage.name + " | " + selectedPackage.uuid + " -> " + errorResponse.message)
          this.packageRemovingProgress = Math.round(100 * (this.packageRemovingStatus.length / this.selectedPackagesToRemove.length));
        });
    }
    this.serverApiService.resetDeploymentValidation().then();
    this.groupShowPackagesComponentMatDialogRef.disableClose = false;
    this.packageRemovingProcessStarted = false;
  }

  applySearchForPackagesToRemove(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.groupPackageResponse) {
      this.visiblePackagesToRemove = this.groupPackageResponse.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    }
    this.changeDetector.detectChanges();
  }

  addVisiblePackages() {
    let agentsToAdd = this.visiblePackagesToRemove.filter(item => !this.selectedPackagesToRemove.includes(item));
    this.selectedPackagesToRemove = this.selectedPackagesToRemove.concat(agentsToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisiblePackages() {
    this.selectedPackagesToRemove = this.selectedPackagesToRemove.filter(item => !this.visiblePackagesToRemove.includes(item));
    this.changeDetector.detectChanges();

  }

  isPackageInSelectedList(agentUUID: string): boolean {
    return this.selectedPackagesToRemove.filter(item => item.uuid === agentUUID).length > 0;
  }
}
