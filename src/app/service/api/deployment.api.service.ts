import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {VariableService} from "../variable/variable.service";
import {DeploymentListResponse} from "./reponse/deploymentListResponse";
import {DeploymentEntity} from "./entity/deploymentEntity";
import {CreateDeploymentRequest} from "./request/createDeploymentRequest";

@Injectable({
  providedIn: 'root'
})
export class DeploymentApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(): Promise<DeploymentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment").subscribe({
        next: value => {
          resolve(new DeploymentListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public get(deploymentUUID: string): Promise<DeploymentEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/deployment/" + deploymentUUID).subscribe({
        next: value => {
          resolve(new DeploymentEntity(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public delete(deploymentUUID: string): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/deployment/" + deploymentUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public create(createDeploymentRequest: CreateDeploymentRequest): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/deployment", createDeploymentRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

}
