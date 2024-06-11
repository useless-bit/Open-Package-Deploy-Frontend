import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ArrayPopupComponent} from "../../../shared-components/array-popup/array-popup.component";
import {ArrayPopupInput} from "../../../shared-components/array-popup/arrayPopupInput";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
  private dialogRef: MatDialogRef<ArrayPopupComponent> | undefined;


  constructor(private packageApiService: PackageApiService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.packageApiService.getAll().then(packageResponse => {
      if (packageResponse) {
        this.packageEntities = packageResponse.packages;
        this.calculatePackages()
        this.dataLoaded = true;
        this.refreshingData = false;
        this.updatePopupData();
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

  showAwaitingProcessingPackagesPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Packages awaiting processing", this.packageEntitiesAwaitingProcessing.map(item => item.name + " | " + item.uuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  showErrorPackagesPopup(): void {
    this.dialogRef = this.dialog.open(ArrayPopupComponent, {
      data: new ArrayPopupInput("Packages with errors during processing", this.packageEntitiesError.map(item => item.name + " | " + item.uuid)),
      panelClass: "main-popup"
    });
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = undefined)
  }

  updatePopupData(): void {
    if (this.dialogRef) {
      if (this.dialogRef.componentInstance.arrayPopupInput.title == "Packages awaiting processing") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.packageEntitiesAwaitingProcessing.map(item => item.name + " | " + item.uuid);
      } else if (this.dialogRef.componentInstance.arrayPopupInput.title == "Packages with errors during processing") {
        this.dialogRef.componentInstance.arrayPopupInput.entries = this.packageEntitiesError.map(item => item.name + " | " + item.uuid);

      }
    }
  }

}
