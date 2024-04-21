import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
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
  MatTableDataSource,
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {LoadingComponent} from "../../loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatDivider} from "@angular/material/divider";
import {GroupEntity} from "../../../service/api/entity/groupEntity";
import {GroupApiService} from "../../../service/api/group.api.service";
import {GroupCreateComponent} from "../group-create/group-create.component";
import {GroupDetailPopupComponent} from "../group-detail-popup/group-detail-popup.component";

@Component({
  selector: 'app-group-overview',
  standalone: true,
  imports: [
    LoadingComponent,
    NgIf,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatTooltip,
    MatProgressBar,
    MatAccordion,
    MatExpansionPanel,
    MatChipListbox,
    MatChipOption,
    NgForOf,
    MatButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatDivider,
    MatPaginator,
    MatExpansionPanelHeader,
    MatLabel,
    MatSuffix,
    MatSortHeader
  ],
  templateUrl: './group-overview.component.html',
  styleUrl: './group-overview.component.scss'
})
export class GroupOverviewComponent implements OnInit {
  @ViewChild('searchInputField') searchField: ElementRef | null = null;
  public dataLoaded: boolean = false;
  public selectedColumns: string[] = ['name'];
  public searchLoadingBar: boolean = false;
  private localStorageNameSelectedColumns: string = "selectedColumns_GroupOverview";
  private groupInstance: GroupEntity = new GroupEntity(0);
  public groupKeys = Object.keys(this.groupInstance) as Array<keyof GroupEntity>

  constructor(private groupApiService: GroupApiService,
              private dialog: MatDialog,
              public dataSourceGroupOverviewTable: MatTableDataSource<GroupEntity>) {
    this.dataSourceGroupOverviewTable = dataSourceGroupOverviewTable;
    this.dataSourceGroupOverviewTable.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  @ViewChild('tablePaginator') set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSourceGroupOverviewTable.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set tableSort(sort: MatSort) {
    if (sort) {
      this.dataSourceGroupOverviewTable.sort = sort;
    }
  }

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.groupKeys.includes(col as keyof GroupEntity));
    }
    this.groupApiService.getAll().then(response => {
      if (response) {
        this.dataSourceGroupOverviewTable.data = response.groups;
        this.dataSourceGroupOverviewTable.filter = "";

        this.dataLoaded = true;
        this.searchLoadingBar = false;
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceGroupOverviewTable.filter = filterValue.trim().toLowerCase();
  }

  changeSelectedColumns(group: string): void {
    const index = this.selectedColumns.indexOf(group);
    if (index === -1) {
      this.selectedColumns.push(group);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
  }

  public isColumnSelected(group: string): boolean {
    return this.selectedColumns.includes(group);
  }

  public filterVisibleColumns(data: GroupEntity, filter: string): boolean {
    return this.selectedColumns.some(column => {
      const value = String(data[column as keyof GroupEntity]).toLowerCase();
      return value.includes(filter);
    });
  }

  public showDetailInfoPopup(groupUUID: string): void {
    this.dialog.open(GroupDetailPopupComponent, {
      data: {groupUUID: groupUUID},
      panelClass: "main-popup"
    }).afterClosed().subscribe(() => {
      this.refreshData();
    });
  }

  public convertStringChipNameGroupEntity(str: string): string {
    const convertedString = str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    return convertedString.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  refreshData(): void {
    this.searchLoadingBar = true;
    this.groupApiService.getAll().then(response => {
      if (response) {
        this.dataSourceGroupOverviewTable.data = response.groups;
        this.searchLoadingBar = false;
      }
    });
  }

  clearTextField(): void {
    if (this.searchField) {
      this.searchField.nativeElement.value = "";
    }
    this.dataSourceGroupOverviewTable.filter = "";
  }

  openAddNewPopup() {
    this.dialog.open(GroupCreateComponent, {panelClass: "main-popup"}).afterClosed().subscribe(() => {
      this.refreshData();
    })
  }
}
