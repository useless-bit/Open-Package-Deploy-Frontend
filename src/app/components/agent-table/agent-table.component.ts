import {Component, OnInit} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {AgentEntity} from "../../service/api/entity/agentEntity";
import {ApiService} from "../../service/api/api.service";
import {AgentListResponse} from "../../service/api/reponse/agentListResponse";
import {NgIf} from "@angular/common";
import {LoadingFullscreenComponent} from "../loading-fullscreen/loading-fullscreen.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

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
    MatInput
  ],
  templateUrl: './agent-table.component.html',
  styleUrl: './agent-table.component.scss'
})
export class AgentTableComponent implements OnInit {

  displayedColumns: string[] = ['uuid', 'name', 'registrationCompleted'];
  dataSource: MatTableDataSource<AgentEntity>;
  public dataLoaded: boolean = false;

  constructor(dataSource: MatTableDataSource<AgentEntity>,
              private apiService: ApiService) {
    this.dataSource = dataSource;
  }

  ngOnInit() {
    this.apiService.getAllAgents().then(response => {
      if (response) {
        this.dataSource.data = response.agents;
      }
      this.dataLoaded = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
