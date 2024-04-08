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
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {LoadingComponent} from "../../loading/loading.component";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatInput} from "@angular/material/input";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {LogEntity} from "../../../service/api/entity/logEntity";
import {ServerApiService} from "../../../service/api/server.api.service";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-log-overview',
  standalone: true,
  imports: [
    LoadingComponent,
    MatFormField,
    MatIcon,
    MatProgressBar,
    MatIconButton,
    MatTooltip,
    MatInput,
    MatExpansionPanel,
    MatAccordion,
    MatChipListbox,
    MatChipOption,
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCellDef,
    MatCellDef,
    NgForOf,
    MatHeaderRowDef,
    MatRow,
    MatHeaderRow,
    MatCell,
    MatHeaderCell,
    MatDivider,
    MatPaginator,
    MatRowDef,
    MatSortHeader,
    NgIf,
    MatExpansionPanelHeader,
    MatLabel,
    MatIconButton,
    MatSuffix,
    MatSlideToggle,
    FormsModule,
  ],
  templateUrl: './log-overview.component.html',
  styleUrl: './log-overview.component.scss'
})
export class LogOverviewComponent implements OnInit {
  @ViewChild('searchInputField') searchField: ElementRef | null = null;
  public sliderShowLogSeverityInfo: boolean = true;
  public sliderShowLogSeverityWarning: boolean = true;
  public sliderShowLogSeverityError: boolean = true;
  public dataLoaded: boolean = false;
  public searchLoadingBar: boolean = false;
  public tableRows: string[] = ['timestamp', 'severity', 'message']
  private logResponse: LogEntity[] = [];

  constructor(private serverApiService: ServerApiService,
              public dataSourceLogOverviewTable: MatTableDataSource<LogEntity>) {
    this.dataSourceLogOverviewTable = dataSourceLogOverviewTable;
    this.dataSourceLogOverviewTable.filterPredicate = (data, filter) => {
      return data.message.toLowerCase().includes(filter);
    }
  }

  @ViewChild('tablePaginator') set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSourceLogOverviewTable.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set tableSort(sort: MatSort) {
    if (sort) {
      this.dataSourceLogOverviewTable.sort = sort;
    }
  }

  ngOnInit() {
    this.serverApiService.getLogs().then(response => {
      if (response) {
        let logEntities: LogEntity[] = response.logEntries
        for (let logEntity of logEntities) {
          logEntity.timestamp = this.formatDate(logEntity.timestamp)
        }
        this.logResponse = logEntities;
        this.dataSourceLogOverviewTable.filter = "";
        this.filterData();

        this.dataLoaded = true;
        this.searchLoadingBar = false;
      }
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLogOverviewTable.filter = filterValue.trim().toLowerCase();
  }

  refreshData(): void {
    this.searchLoadingBar = true;
    this.serverApiService.getLogs().then(response => {
      if (response) {
        let logEntities: LogEntity[] = response.logEntries
        for (let logEntity of logEntities) {
          logEntity.timestamp = this.formatDate(logEntity.timestamp)
        }
        this.logResponse = logEntities;
        this.filterData();

        this.searchLoadingBar = false;
      }
    });
  }

  filterData(): void {
    let filteredLogs = this.logResponse;

    if (!this.sliderShowLogSeverityInfo) {
      filteredLogs = filteredLogs.filter(item => item.severity !== "INFO");
    }
    if (!this.sliderShowLogSeverityWarning) {
      filteredLogs = filteredLogs.filter(item => item.severity !== "WARNING");
    }
    if (!this.sliderShowLogSeverityError) {
      filteredLogs = filteredLogs.filter(item => item.severity !== "ERROR");
    }

    this.dataSourceLogOverviewTable.data = filteredLogs;
  }

  clearTextField(): void {
    if (this.searchField) {
      this.searchField.nativeElement.value = "";
    }
    this.dataSourceLogOverviewTable.filter = "";
  }

  sliderShowLogSeverityInfoChange(event: MatSlideToggleChange) {
    this.sliderShowLogSeverityInfo = event.checked;
    this.filterData();
  }

  sliderShowLogSeverityWarningChange(event: MatSlideToggleChange) {
    this.sliderShowLogSeverityWarning = event.checked;
    this.filterData();
  }

  sliderShowLogSeverityErrorChange(event: MatSlideToggleChange) {
    this.sliderShowLogSeverityError = event.checked;
    this.filterData();
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
