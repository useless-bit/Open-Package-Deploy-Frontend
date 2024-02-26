import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoadingFullscreenComponent} from "../../loading-fullscreen/loading-fullscreen.component";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDivider} from "@angular/material/divider";
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../../../service/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageDetailPopupComponent} from "../package-detail-popup/package-detail-popup.component";

@Component({
  selector: 'app-package-overview',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    MatFormField,
    MatLabel,
    MatIcon,
    MatProgressBar,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatChipListbox,
    MatChipOption,
    MatButton,
    MatInput,
    MatIconButton,
    MatTooltip,
    NgIf,
    MatTable,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatDivider,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    NgForOf,
    MatColumnDef,
    MatSortHeader,
    MatSuffix
  ],
  templateUrl: './package-overview.component.html',
  styleUrl: './package-overview.component.scss'
})
export class PackageOverviewComponent {
  @ViewChild('searchInputField') searchField: ElementRef | null = null;

  @ViewChild('tablePaginator') set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set tableSort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  private localStorageNameSelectedColumns: string = "selectedColumns_PackageOverview";
  private packageInstance: PackageEntity = new PackageEntity(0);

  public dataLoaded: boolean = false;
  public selectedColumns: String[] = ['name'];
  public packageKeys = Object.keys(this.packageInstance) as Array<keyof PackageEntity>
  public searchLoadingBar: boolean = false;

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              public dataSource: MatTableDataSource<PackageEntity>) {
    this.dataSource = dataSource;
    this.dataSource.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.packageKeys.includes(col as keyof PackageEntity));
    }
    this.apiService.getAllPackages().then(response => {
      if (response) {
        this.dataSource.data = response.packages;
        this.dataSource.filter = "";
        this.dataLoaded = true;
        this.searchLoadingBar = false;
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeSelectedColumns(package_item: String): void {
    const index = this.selectedColumns.indexOf(package_item);
    if (index === -1) {
      this.selectedColumns.push(package_item);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
    this.dataSource.filter = this.dataSource.filter;
  }

  public isColumnSelected(package_item: string): boolean {
    return this.selectedColumns.includes(package_item);
  }

  public filterVisibleColumns(data: PackageEntity, filter: string): boolean {
    return this.selectedColumns.some(column => {
      const value = String(data[column as keyof PackageEntity]).toLowerCase();
      return value.includes(filter);
    });
  }

  public showDetailInfoPopup(packageUUID: string): void {
    this.dialog.open(PackageDetailPopupComponent, {
      data: {packageUUID: packageUUID},
      panelClass: "main-popup"
    }).afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  public convertStringChipName(str: string): string {
    const convertedString = str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    return convertedString.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  refreshData(): void {
    this.searchLoadingBar = true;
    this.apiService.getAllPackages().then(response => {
      if (response) {
        this.dataSource.data = response.packages;
        this.searchLoadingBar = false;
      }
    });
  }

  clearTextField(): void {
    if (this.searchField) {
      this.searchField.nativeElement.value = "";
    }
    this.dataSource.filter = "";
  }

  openAddNewPopup() {
    this.dialog.open(PlaceholderComponent)
  }

}
