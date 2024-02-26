import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {AgentEntity} from "../../service/api/entity/agentEntity";
import {ApiService} from "../../service/api/api.service";
import {NgForOf, NgIf} from "@angular/common";
import {LoadingFullscreenComponent} from "../loading-fullscreen/loading-fullscreen.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChip, MatChipListbox, MatChipOption, MatChipSet} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PlaceholderComponent} from "../placeholder/placeholder.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {AgentDetailPopupComponent} from "../agent-detail-popup/agent-detail-popup.component";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-agent-overview',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    NgIf,
    LoadingFullscreenComponent,
    MatFormField,
    MatInput,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatChipListbox,
    MatChipOption,
    NgForOf,
    MatChip,
    MatChipSet,
    MatIcon,
    MatIconButton,
    MatFormFieldModule,
    MatProgressBar,
    MatButton,
    MatTooltip,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatDivider
  ],
  templateUrl: './agent-overview.component.html',
  styleUrl: './agent-overview.component.scss'
})
export class AgentOverviewComponent implements OnInit {
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

  private localStorageNameSelectedColumns: string = "selectedColumns_AgentOverview";
  private agentInstance: AgentEntity = new AgentEntity(0);

  public dataLoaded: boolean = false;
  public selectedColumns: String[] = ['name'];
  public agentKeys = Object.keys(this.agentInstance) as Array<keyof AgentEntity>
  public searchLoadingBar: boolean = false;

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              public dataSource: MatTableDataSource<AgentEntity>) {
    this.dataSource = dataSource;
    this.dataSource.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.agentKeys.includes(col as keyof AgentEntity));
    }
    this.apiService.getAllAgents().then(response => {
      if (response) {
        this.dataSource.data = response.agents;
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

  changeSelectedColumns(agent: String): void {
    const index = this.selectedColumns.indexOf(agent);
    if (index === -1) {
      this.selectedColumns.push(agent);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
    this.dataSource.filter = this.dataSource.filter;
  }

  public isColumnSelected(agent: string): boolean {
    return this.selectedColumns.includes(agent);
  }

  public filterVisibleColumns(data: AgentEntity, filter: string): boolean {
    return this.selectedColumns.some(column => {
      const value = String(data[column as keyof AgentEntity]).toLowerCase();
      return value.includes(filter);
    });
  }

  public showDetailInfoPopup(agentUUID: string): void {
    this.dialog.open(AgentDetailPopupComponent, {
      data: {agentUUID},
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
    this.apiService.getAllAgents().then(response => {
      if (response) {
        this.dataSource.data = response.agents;
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
