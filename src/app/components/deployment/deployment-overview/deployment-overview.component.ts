import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingFullscreenComponent} from "../../loading-fullscreen/loading-fullscreen.component";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {ApiService} from "../../../service/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {DeploymentDetailPopupComponent} from "../deployment-detail-popup/deployment-detail-popup.component";
import {DeploymentCreateComponent} from "../deployment-create/deployment-create.component";

@Component({
  selector: 'app-deployment-overview',
  standalone: true,
  imports: [
    LoadingFullscreenComponent,
    MatAccordion,
    MatButton,
    MatCell,
    MatCellDef,
    MatChipListbox,
    MatChipOption,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatProgressBar,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatSuffix,
    MatTable,
    MatTooltip,
    NgForOf,
    NgIf,
    MatColumnDef,
    MatHeaderCellDef
  ],
  templateUrl: './deployment-overview.component.html',
  styleUrl: './deployment-overview.component.scss'
})
export class DeploymentOverviewComponent implements OnInit {
  @ViewChild('searchInputField') searchField: ElementRef | null = null;
  public dataLoaded: boolean = false;
  public selectedColumns: String[] = ['agentUuid', 'packageUuid'];
  public searchLoadingBar: boolean = false;
  private localStorageNameSelectedColumns: string = "selectedColumns_DeploymentOverview";
  private deploymentInstance: DeploymentEntity = new DeploymentEntity(0);
  public deploymentKeys = Object.keys(this.deploymentInstance) as Array<keyof DeploymentEntity>

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              public dataSource: MatTableDataSource<DeploymentEntity>) {
    this.dataSource = dataSource;
    this.dataSource.filterPredicate = this.filterVisibleColumns.bind(this);
  }

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

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.deploymentKeys.includes(col as keyof DeploymentEntity));
    }
    this.apiService.getAllDeployments().then(response => {
      if (response) {
        this.dataSource.data = response.deployments;
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

  changeSelectedColumns(deployment: String): void {
    const index = this.selectedColumns.indexOf(deployment);
    if (index === -1) {
      this.selectedColumns.push(deployment);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
    this.dataSource.filter = this.dataSource.filter;
  }

  public isColumnSelected(deployment: string): boolean {
    return this.selectedColumns.includes(deployment);
  }

  public filterVisibleColumns(data: DeploymentEntity, filter: string): boolean {
    return this.selectedColumns.some(column => {
      const value = String(data[column as keyof DeploymentEntity]).toLowerCase();
      return value.includes(filter);
    });
  }

  public showDetailInfoPopup(deploymentUUID: string): void {
    this.dialog.open(DeploymentDetailPopupComponent, {
      data: {deploymentUUID: deploymentUUID},
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
    this.apiService.getAllDeployments().then(response => {
      if (response) {
        this.dataSource.data = response.deployments;
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
    this.dialog.open(DeploymentCreateComponent, {panelClass: "main-popup"})
      .afterClosed().subscribe(() => {
      this.refreshData();
    });
  }
}
