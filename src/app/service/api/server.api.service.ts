import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {ApiService} from "./api.service";
import {GetRegistrationTokenResponse} from "./reponse/getRegistrationTokenResponse";
import {GetAgentUpdateIntervalResponse} from "./reponse/getAgentUpdateIntervalResponse";
import {ChangeAgentUpdateInterval} from "./request/changeAgentUpdateInterval";
import {ChangeAgentInstallRetryInterval} from "./request/changeAgentInstallRetryInterval";
import {GetAgentInstallRetryIntervalResponse} from "./reponse/getAgentInstallRetryIntervalResponse";
import {GetAgentChecksumResponse} from "./reponse/getAgentChecksumResponse";
import {GetStorageInformationResponse} from "./reponse/getStorageInformationResponse";
import {SystemUsageListResponse} from "./reponse/systemUsageListResponse";
import {LogListResponse} from "./reponse/logListResponse";

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getRegistrationToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/registrationToken").subscribe({
        next: value => {
          const response = value as GetRegistrationTokenResponse;
          resolve(response.registrationToken);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public generateNewRegistrationToken(): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/server/registrationToken", null).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getAgentUpdateInterval(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/updateInterval").subscribe({
        next: value => {
          const response = value as GetAgentUpdateIntervalResponse;
          resolve(response.updateInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public changeAgentUpdateInterval(changeAgentUpdateInterval: ChangeAgentUpdateInterval): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/updateInterval", changeAgentUpdateInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getAgentInstallRetryInterval(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/installRetryInterval").subscribe({
        next: value => {
          const response = value as GetAgentInstallRetryIntervalResponse;
          resolve(response.installRetryInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public changeAgentInstallRetryInterval(changeAgentInstallRetryInterval: ChangeAgentInstallRetryInterval): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/installRetryInterval", changeAgentInstallRetryInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getAgentChecksum(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/agentChecksum").subscribe({
        next: value => {
          const response = value as GetAgentChecksumResponse;
          resolve(response.agentChecksum);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getStorageInformation(): Promise<GetStorageInformationResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/storage").subscribe({
        next: value => {
          const response = value as GetStorageInformationResponse;
          resolve(response);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getSystemUsage(): Promise<SystemUsageListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/systemUsage").subscribe({
        next: value => {
          resolve(new SystemUsageListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public getLogs(): Promise<LogListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/log").subscribe({
        next: value => {
          resolve(new LogListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }
}
