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
import {AgentEntity} from "../../../service/api/entity/agentEntity";
import {NgForOf, NgIf} from "@angular/common";
import {LoadingComponent} from "../../loading/loading.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChip, MatChipListbox, MatChipOption, MatChipSet} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTooltip} from "@angular/material/tooltip";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {AgentDetailPopupComponent} from "../agent-detail-popup/agent-detail-popup.component";
import {MatDivider} from "@angular/material/divider";
import {AgentApiService} from "../../../service/api/agent.api.service";
import {AgentAddNewComponent} from "../agent-add-new/agent-add-new.component";

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
    LoadingComponent,
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
    MatSortHeader,
    MatDivider,
    MatSort
  ],
  templateUrl: './agent-overview.component.html',
  styleUrl: './agent-overview.component.scss'
})
export class AgentOverviewComponent implements OnInit {
  @ViewChild('searchInputField') searchField: ElementRef | null = null;
  public dataLoaded: boolean = false;
  public selectedColumns: string[] = ['name'];
  public searchLoadingBar: boolean = false;
  private localStorageNameSelectedColumns: string = "selectedColumns_AgentOverview";
  private agentInstance: AgentEntity = new AgentEntity(0);
  public agentKeys = Object.keys(this.agentInstance) as Array<keyof AgentEntity>

  constructor(private agentApiService: AgentApiService,
              private dialog: MatDialog,
              public dataSourceAgentOverviewTable: MatTableDataSource<AgentEntity>) {
    this.dataSourceAgentOverviewTable = dataSourceAgentOverviewTable;
    this.dataSourceAgentOverviewTable.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  @ViewChild('tablePaginator') set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSourceAgentOverviewTable.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set tableSort(sort: MatSort) {
    if (sort) {
      this.dataSourceAgentOverviewTable.sort = sort;
    }
  }

  ngOnInit() {
    const storedSelectedColumns = localStorage.getItem(this.localStorageNameSelectedColumns);
    if (storedSelectedColumns) {
      this.selectedColumns = JSON.parse(storedSelectedColumns);
      this.selectedColumns = this.selectedColumns.filter(col => this.agentKeys.includes(col as keyof AgentEntity));
    }
    this.agentApiService.getAll().then(response => {
      if (response) {
        let agentEntities: AgentEntity[] = response.agents
        for (let agentEntity of agentEntities) {
          agentEntity.lastConnectionTime = this.formatDate(agentEntity.lastConnectionTime)
        }
        this.dataSourceAgentOverviewTable.data = agentEntities;
        this.dataSourceAgentOverviewTable.filter = "";

        this.dataLoaded = true;
        this.searchLoadingBar = false;
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAgentOverviewTable.filter = filterValue.trim().toLowerCase();
  }

  changeSelectedColumns(agent: string): void {
    const index = this.selectedColumns.indexOf(agent);
    if (index === -1) {
      this.selectedColumns.push(agent);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    localStorage.setItem(this.localStorageNameSelectedColumns, JSON.stringify(this.selectedColumns));
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

  public convertStringChipNameAgentEntity(str: string): string {
    const convertedString = str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
    return convertedString.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  refreshData(): void {
    this.searchLoadingBar = true;
    this.agentApiService.getAll().then(response => {
      if (response) {
        let agentEntities: AgentEntity[] = response.agents
        for (let agentEntity of agentEntities) {
          agentEntity.lastConnectionTime = this.formatDate(agentEntity.lastConnectionTime)
        }
        this.dataSourceAgentOverviewTable.data = agentEntities;
        this.searchLoadingBar = false;
      }
    });
  }

  clearTextField(): void {
    if (this.searchField) {
      this.searchField.nativeElement.value = "";
    }
    this.dataSourceAgentOverviewTable.filter = "";
  }

  openAddNewPopup() {
    this.dialog.open(AgentAddNewComponent, {panelClass: "main-popup"})
  }

  formatDate(dateObj: Date | string): string {
    if (dateObj && typeof dateObj != "string") {
      return dateObj.toLocaleString("en-US", {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        localeMatcher: "best fit"
      });
    }
    return "N/A"
  }
}
