import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {ApiService} from "./api.service";
import {GetRegistrationTokenResponse} from "./reponse/getRegistrationTokenResponse";
import {GetAgentUpdateIntervalResponse} from "./reponse/getAgentUpdateIntervalResponse";
import {ChangeAgentUpdateInterval} from "./request/changeAgentUpdateInterval";

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getRegistrationToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/registrationToken").subscribe({
        next: value => {
          const response = value as GetRegistrationTokenResponse;
          resolve(response.registrationToken);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject();
        }
      });
    });
  }

  public generateNewRegistrationToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/server/registrationToken", null).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject();
        }
      });
    });
  }

  public getAgentUpdateInterval(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/updateInterval").subscribe({
        next: value => {
          const response = value as GetAgentUpdateIntervalResponse;
          resolve(response.updateInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject();
        }
      });
    });
  }

  public changeAgentUpdateInterval(changeAgentUpdateInterval1: ChangeAgentUpdateInterval): Promise<void > {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/updateInterval", changeAgentUpdateInterval1).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject();
        }
      });
    });
  }


}
