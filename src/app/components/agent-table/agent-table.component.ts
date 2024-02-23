import {Component, OnInit} from '@angular/core';
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
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatChip, MatChipListbox, MatChipOption, MatChipSet} from "@angular/material/chips";
import {MatDialog} from "@angular/material/dialog";
import {TestContentComponent} from "../test-content/test-content.component";

@Component({
  selector: 'app-agent-table',
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
    MatChipSet
  ],
  templateUrl: './agent-table.component.html',
  styleUrl: './agent-table.component.scss'
})
export class AgentTableComponent implements OnInit {

  dataSource: MatTableDataSource<AgentEntity>;
  public dataLoaded: boolean = false;
  public selectedColumns: String[] = ['name'];
  public agentInstance: AgentEntity = {name: "", registrationCompleted: false, uuid: ""};
  public agentKeys = Object.keys(this.agentInstance) as Array<keyof AgentEntity>;

  constructor(dataSource: MatTableDataSource<AgentEntity>,
              private apiService: ApiService,
              private dialog: MatDialog) {
    this.dataSource = dataSource;
    this.dataSource.filterPredicate = this.filterVisibleColumns.bind(this);
  }

  ngOnInit() {
    this.apiService.getAllAgents().then(response => {
      if (response) {
        this.dataSource.data = response.agents;
      }
      this.dataLoaded = true;
      this.dataSource.filter = "";
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAgentSelect(agent: String): void {
    const index = this.selectedColumns.indexOf(agent);
    if (index === -1) {
      this.selectedColumns.push(agent);
    } else {
      this.selectedColumns.splice(index, 1);
    }
    this.dataSource.filter = this.dataSource.filter;
  }

  public isSelected(agent: string): boolean {
    return this.selectedColumns.includes(agent);
  }

  public filterVisibleColumns(data: AgentEntity, filter: string): boolean {
    return this.selectedColumns.some(column => {
      const value = String(data[column as keyof AgentEntity]).toLowerCase();
      return value.includes(filter);
    });
  }

  public showAgentInfo(agentUUID: string): void {
    this.dialog.open(TestContentComponent, {data: {agentUUID}, panelClass: "main-popup"});
  }
}
