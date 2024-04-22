import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {ApiService} from "./api.service";
import {ServerRegistrationTokenResponse} from "./reponse/server/serverRegistrationTokenResponse";
import {ServerAgentUpdateIntervalResponse} from "./reponse/server/serverAgentUpdateIntervalResponse";
import {ChangeAgentUpdateInterval} from "./request/changeAgentUpdateInterval";
import {ChangeAgentInstallRetryInterval} from "./request/changeAgentInstallRetryInterval";
import {ServerAgentInstallRetryIntervalResponse} from "./reponse/server/serverAgentInstallRetryIntervalResponse";
import {ServerAgentChecksumResponse} from "./reponse/server/serverAgentChecksumResponse";
import {ServerStorageInformationResponse} from "./reponse/server/serverStorageInformationResponse";
import {ServerSystemUsageResponse} from "./reponse/server/serverSystemUsageResponse";
import {ServerLogListResponse} from "./reponse/server/serverLogListResponse";
import {ChangeDeploymentValidationInterval} from "./request/changeDeploymentValidationInterval";
import {ServerDeploymentValidationIntervalResponse} from "./reponse/server/serverDeploymentValidationIntervalResponse";
import {ServerLastDeploymentValidationResponse} from "./reponse/server/serverLastDeploymentValidationResponse";

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
          const response = value as ServerRegistrationTokenResponse;
          resolve(response.registrationToken);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
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
          reject(new Error(error));
        }
      });
    });
  }

  public getAgentUpdateInterval(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/updateInterval").subscribe({
        next: value => {
          const response = value as ServerAgentUpdateIntervalResponse;
          resolve(response.updateInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
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
          reject(new Error(error));
        }
      });
    });
  }

  public getAgentInstallRetryInterval(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/installRetryInterval").subscribe({
        next: value => {
          const response = value as ServerAgentInstallRetryIntervalResponse;
          resolve(response.installRetryInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
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
          reject(new Error(error));
        }
      });
    });
  }

  public getDeploymentValidationInterval(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/deploymentValidationInterval").subscribe({
        next: value => {
          const response = value as ServerDeploymentValidationIntervalResponse;
          resolve(response.deploymentValidationInterval);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public changeDeploymentValidationInterval(changeAgentInstallRetryInterval: ChangeDeploymentValidationInterval): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/deploymentValidationInterval", changeAgentInstallRetryInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public getLastDeploymentValidationTimestamp(): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/deploymentValidation").subscribe({
        next: value => {
          const response = value as ServerLastDeploymentValidationResponse;
          resolve(response.lastDeploymentValidation);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public resetDeploymentValidation(): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/deploymentValidation/reset", null).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public getAgentChecksum(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/agentChecksum").subscribe({
        next: value => {
          const response = value as ServerAgentChecksumResponse;
          resolve(response.agentChecksum);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public getStorageInformation(): Promise<ServerStorageInformationResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/storage").subscribe({
        next: value => {
          const response = value as ServerStorageInformationResponse;
          resolve(response);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public getSystemUsage(): Promise<ServerSystemUsageResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/systemUsage").subscribe({
        next: value => {
          resolve(new ServerSystemUsageResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public getLogs(): Promise<ServerLogListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/log").subscribe({
        next: value => {
          resolve(new ServerLogListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }
}
