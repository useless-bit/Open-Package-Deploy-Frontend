import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ServerApiService} from "../../../service/api/server.api.service";
import {SystemUsageEntity} from "../../../service/api/entity/systemUsageEntity";
import {BaseChartDirective} from "ng2-charts";
import {ApexChart, ApexTheme, ChartComponent, NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-home-server-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar,
    BaseChartDirective,
    NgApexchartsModule
  ],
  templateUrl: './home-server-status.component.html',
  styleUrl: './home-server-status.component.scss'
})
export class HomeServerStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public refreshingData: boolean = false;
  public systemUsageData: SystemUsageEntity[] = [];
  public chartLabels: string[] = [];
  public chartDataCPU: any;
  public chartDataMemory: any;
  public chartOptions: ApexChart = {
    toolbar: {
      show: false,
      tools: {
        zoom: false
      }
    },
    type: "line",
    height: 300,
    width: "100%"
  };
  public chartTheme: ApexTheme = {
    mode: "dark"
  };

  @ViewChild('cpuChart') cpuChart: ChartComponent | undefined;
  @ViewChild('memoryChart') memoryChart: ChartComponent | undefined;

  constructor(private serverApiService: ServerApiService) {
  }

  ngOnInit() {
    this.serverApiService.getSystemUsage().then(serverResponse => {
      if (serverResponse) {
        this.systemUsageData = serverResponse.systemUsageEntries;
        this.updateChartData().then(() => {
          this.dataLoaded = true;
        });
      }
    });
  }

  updateChartData(): Promise<void> {
    return new Promise((resolve) => {
      this.chartDataCPU = [{
        name: "CPU-Usage",
        data: this.systemUsageData.map(item => item.cpuUsage)
      }];
      this.chartDataMemory = [{
        name: "Memory-Usage",
        data: this.systemUsageData.map(item => (((item.memoryTotal - item.memoryAvailable) / item.memoryTotal) * 100).toFixed(2))
      }];
      this.chartLabels = this.systemUsageData.map(item => item.timestamp.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
      resolve();
    });
  }

  refreshData(): void {
    this.refreshingData = true;
    this.serverApiService.getSystemUsage().then(serverResponse => {
      if (serverResponse) {
        this.systemUsageData = serverResponse.systemUsageEntries;

        this.cpuChart?.updateSeries([{
          name: "CPU-Usage",
          data: this.systemUsageData.map(item => item.cpuUsage)
        }]);
        this.memoryChart?.updateSeries([{
          name: "CPU-Usage",
          data: this.systemUsageData.map(item => parseFloat((((item.memoryTotal - item.memoryAvailable) / item.memoryTotal) * 100).toFixed(2)))
        }]);
        this.cpuChart?.updateOptions({
          labels: this.systemUsageData.map(item => item.timestamp.toLocaleString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }))
        })
        this.memoryChart?.updateOptions({
          labels: this.systemUsageData.map(item => item.timestamp.toLocaleString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }))
        })
      }
      this.refreshingData = false;
    });
  }
}
