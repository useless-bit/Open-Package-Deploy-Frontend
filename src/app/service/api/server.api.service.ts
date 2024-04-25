import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {ApiService} from "./api.service";
import {ServerRegistrationTokenResponse} from "./reponse/server/serverRegistrationTokenResponse";
import {ServerAgentUpdateIntervalResponse} from "./reponse/server/serverAgentUpdateIntervalResponse";
import {ServerAgentUpdateIntervalRequest} from "./request/server/serverAgentUpdateIntervalRequest";
import {ServerAgentInstallRetryRequest} from "./request/server/serverAgentInstallRetryRequest";
import {ServerAgentInstallRetryIntervalResponse} from "./reponse/server/serverAgentInstallRetryIntervalResponse";
import {ServerAgentChecksumResponse} from "./reponse/server/serverAgentChecksumResponse";
import {ServerStorageInformationResponse} from "./reponse/server/serverStorageInformationResponse";
import {ServerSystemUsageResponse} from "./reponse/server/serverSystemUsageResponse";
import {ServerLogListResponse} from "./reponse/server/serverLogListResponse";
import {ServerDeploymentValidationRequest} from "./request/server/serverDeploymentValidationRequest";
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

  public getRegistrationToken(bypassError: boolean = false): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/registrationToken").subscribe({
        next: value => {
          const response = value as ServerRegistrationTokenResponse;
          resolve(response.registrationToken);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public generateNewRegistrationToken(bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/server/registrationToken", null).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getAgentUpdateInterval(bypassError: boolean = false): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/updateInterval").subscribe({
        next: value => {
          const response = value as ServerAgentUpdateIntervalResponse;
          resolve(response.updateInterval);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public changeAgentUpdateInterval(changeAgentUpdateInterval: ServerAgentUpdateIntervalRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/updateInterval", changeAgentUpdateInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getAgentInstallRetryInterval(bypassError: boolean = false): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/installRetryInterval").subscribe({
        next: value => {
          const response = value as ServerAgentInstallRetryIntervalResponse;
          resolve(response.installRetryInterval);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public changeAgentInstallRetryInterval(changeAgentInstallRetryInterval: ServerAgentInstallRetryRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/installRetryInterval", changeAgentInstallRetryInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getDeploymentValidationInterval(bypassError: boolean = false): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/deploymentValidationInterval").subscribe({
        next: value => {
          const response = value as ServerDeploymentValidationIntervalResponse;
          resolve(response.deploymentValidationInterval);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public changeDeploymentValidationInterval(changeAgentInstallRetryInterval: ServerDeploymentValidationRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/deploymentValidationInterval", changeAgentInstallRetryInterval).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getLastDeploymentValidationTimestamp(bypassError: boolean = false): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/deploymentValidation").subscribe({
        next: value => {
          const response = value as ServerLastDeploymentValidationResponse;
          resolve(response.lastDeploymentValidation);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public resetDeploymentValidation(bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/server/deploymentValidation/reset", null).subscribe({
        next: () => {
          resolve()
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getAgentChecksum(bypassError: boolean = false): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/agentChecksum").subscribe({
        next: value => {
          const response = value as ServerAgentChecksumResponse;
          resolve(response.agentChecksum);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getStorageInformation(bypassError: boolean = false): Promise<ServerStorageInformationResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/storage").subscribe({
        next: value => {
          const response = value as ServerStorageInformationResponse;
          resolve(response);
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getSystemUsage(bypassError: boolean = false): Promise<ServerSystemUsageResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/systemUsage").subscribe({
        next: value => {
          resolve(new ServerSystemUsageResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getLogs(bypassError: boolean = false): Promise<ServerLogListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/server/log").subscribe({
        next: value => {
          resolve(new ServerLogListResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }
}
