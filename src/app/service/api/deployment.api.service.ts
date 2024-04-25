import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {VariableService} from "../variable/variable.service";
import {DeploymentListResponse} from "./reponse/deployment/deploymentListResponse";
import {DeploymentEntity} from "./entity/deploymentEntity";
import {DeploymentCreateRequest} from "./request/deployment/deploymentCreateRequest";

@Injectable({
  providedIn: 'root'
})
export class DeploymentApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(bypassError: boolean = false): Promise<DeploymentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment").subscribe({
        next: value => {
          resolve(new DeploymentListResponse(value));
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public get(deploymentUUID: string, bypassError: boolean = false): Promise<DeploymentEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment/" + deploymentUUID).subscribe({
        next: value => {
          resolve(new DeploymentEntity(value));
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public getDeploymentsForAgent(agentUUID: string, bypassError: boolean = false): Promise<DeploymentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment/agent/" + agentUUID).subscribe({
        next: value => {
          resolve(new DeploymentListResponse(value));
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public getDeploymentsForPackage(packageUUID: string, bypassError: boolean = false): Promise<DeploymentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment/package/" + packageUUID).subscribe({
        next: value => {
          resolve(new DeploymentListResponse(value));
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public delete(deploymentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/deployment/" + deploymentUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public create(createDeploymentRequest: DeploymentCreateRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/deployment", createDeploymentRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public reset(deploymentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/deployment/reset/deployment/" + deploymentUUID, null).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public resetForAgent(agentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/deployment/reset/agent/" + agentUUID, null).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public resetForPackage(packageUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/deployment/reset/package/" + packageUUID, null).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

}
