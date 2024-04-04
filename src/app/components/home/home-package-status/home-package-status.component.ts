import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-home-package-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar
  ],
  templateUrl: './home-package-status.component.html',
  styleUrl: './home-package-status.component.scss'
})
export class HomePackageStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public refreshingData: boolean = false;
  public packageCount: number = 0;
  public packageAwaitingProcessingCount: number = 0;
  public packageErrorCount: number = 0;

  private packageEntities: PackageEntity[] = [];
  private packageEntitiesAwaitingProcessing: PackageEntity[] = [];
  private packageEntitiesError: PackageEntity[] = [];


  constructor(private packageApiService: PackageApiService) {
  }

  ngOnInit() {
    this.packageApiService.getAll().then(packageResponse => {
      if (packageResponse) {
        this.packageEntities = packageResponse.packages;
        this.calculatePackages()
        this.dataLoaded = true;
        this.refreshingData = false;
      }
    });
  }

  calculatePackages(): void {
    this.packageCount = this.packageEntities.length;
    this.packageEntitiesError = this.packageEntities.filter(item => item.packageStatus.includes("ERROR"));
    this.packageErrorCount = this.packageEntitiesError.length;
    this.packageEntitiesAwaitingProcessing = this.packageEntities.filter(item => item.packageStatus === "UPLOADED");
    this.packageAwaitingProcessingCount = this.packageEntitiesAwaitingProcessing.length;
  }
  refreshData(): void {
    this.refreshingData = true;
    this.ngOnInit();
  }
}
