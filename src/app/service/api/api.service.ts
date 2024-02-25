import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {AgentListResponse} from "./reponse/agentListResponse";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ApiErrorResponse} from "./reponse/apiErrorResponse";
import {AgentEntity} from "./entity/agentEntity";
import {AgentUpdateRequest} from "./request/AgentUpdateRequest";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private snackbar: MatSnackBar) {
  }

  private errorHandling(data: HttpErrorResponse) {
    const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition = 'top';
    snackBarConfig.horizontalPosition = 'right';
    snackBarConfig.duration = 5000;
    snackBarConfig.panelClass = ["notification", "error"]
    if (data.status == 0) {
      this.snackbar.open("Server connection Error", "", {duration: 5000, panelClass: "notification-error"});
    } else if (data.status == 400) {
      const apiErrorResponse = data.error as ApiErrorResponse;
      this.snackbar.open(apiErrorResponse.message, "", {
        duration: 5000,
        panelClass: "notification-error"
      });
    } else {
      this.snackbar.open("Error: " + data.status, "", snackBarConfig);
    }
  }

  // Agent
  public getAllAgents(): Promise<AgentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent").subscribe({
        next: value => {
          resolve(new AgentListResponse(value));
        },
        error: (error) => {
          this.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public getAgent(agentUUID: string): Promise<AgentEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent/" + agentUUID).subscribe({
        next: value => {
          resolve(new AgentEntity(value));
        },
        error: (error) => {
          this.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public updateAgent(agentUUID: string, agentUpdateRequest: AgentUpdateRequest): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/agent/" + agentUUID, agentUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.errorHandling(error);
          reject(null);
        }
      });
    });
  }

}
