import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
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
import {MatDialog} from "@angular/material/dialog";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";
import {DeploymentDetailPopupComponent} from "../deployment-detail-popup/deployment-detail-popup.component";
import {DeploymentCreateComponent} from "../deployment-create/deployment-create.component";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";

@Component({
  selector: 'app-deployment-overview',
  standalone: true,
  imports: [
    LoadingComponent,
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
  public selectedColumns: string[] = ['packageName', 'agentName'];
  public searchLoadingBar: boolean = false;
  private localStorageNameSelectedColumns: string = "selectedColumns_DeploymentOverview";
  private deploymentInstance: DeploymentEntity = new DeploymentEntity(0);
  public deploymentKeys = Object.keys(this.deploymentInstance) as Array<keyof DeploymentEntity>

  constructor(private deploymentApiService: DeploymentApiService,
              private dialog: MatDialog,
              public dataSourceDeploymentOverviewTable: MatTableDataSource<DeploymentEntity>) {
    this.dataSourceDeploymentOverviewTable = dataSourceDeploymentOverviewTable;
    this.dataSourceDeploymentOverviewTable.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  @ViewChild('tablePaginator') set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSourceDeploymentOverviewTable.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set tableSort(sort: MatSort) {
    if (sort) {
      this.dataSourceDeploymentOverviewTable.sort = sort;
    }
  }

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.deploymentKeys.includes(col as keyof DeploymentEntity));
    }
    this.deploymentApiService.getAll().then(response => {
      if (response) {
        this.dataSourceDeploymentOverviewTable.data = response.deployments;
        this.dataSourceDeploymentOverviewTable.filter = "";
        this.dataLoaded = true;
        this.searchLoadingBar = false;
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDeploymentOverviewTable.filter = filterValue.trim().toLowerCase();
  }

  changeSelectedColumns(deployment: string): void {
    const index = this.selectedColumns.indexOf(deployment);
    if (index === -1) {
      this.selectedColumns.push(deployment);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
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

  public convertStringChipNameDeploymentEntity(str: string): string {
    const convertedString = str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    return convertedString.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  refreshData(): void {
    this.searchLoadingBar = true;
    this.deploymentApiService.getAll().then(response => {
      if (response) {
        this.dataSourceDeploymentOverviewTable.data = response.deployments;
        this.searchLoadingBar = false;
      }
    });
  }

  clearTextField(): void {
    if (this.searchField) {
      this.searchField.nativeElement.value = "";
    }
    this.dataSourceDeploymentOverviewTable.filter = "";
  }

  openAddNewPopup() {
    this.dialog.open(DeploymentCreateComponent, {panelClass: "main-popup"})
      .afterClosed().subscribe(() => {
      this.refreshData();
    });
  }
}
