import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ServerApiService} from "../../../service/api/server.api.service";
import {UnitConversionUtility} from "../../../utility/unitConversionUtility";

@Component({
  selector: 'app-home-server-storage-status',
  standalone: true,
  imports: [
    LoadingComponent,
    MatDivider,
    MatFormField,
    MatInput,
    MatProgressBar
  ],
  templateUrl: './home-server-storage-status.component.html',
  styleUrl: './home-server-storage-status.component.scss'
})
export class HomeServerStorageStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public refreshingData: boolean = false;
  public spaceTotal: string = "";
  public spaceAvailable: string = "";

  constructor(private serverApiService: ServerApiService) {
  }

  ngOnInit() {
    this.serverApiService.getStorageInformation().then(serverResponse => {
      if (serverResponse) {
        this.spaceTotal = UnitConversionUtility.byteToString(serverResponse.spaceTotal);
        this.spaceAvailable = UnitConversionUtility.byteToString(serverResponse.spaceAvailable);
        this.dataLoaded = true;
        this.refreshingData = false;
      }
    });
  }

  refreshData(): void {
    this.refreshingData = true;
    this.ngOnInit();
  }
}
