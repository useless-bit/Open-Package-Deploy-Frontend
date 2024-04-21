import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {AgentListResponse} from "./reponse/agentListResponse";
import {AgentEntity} from "./entity/agentEntity";
import {AgentUpdateRequests} from "./request/agentUpdateRequest";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AgentApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(): Promise<AgentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent").subscribe({
        next: value => {
          resolve(new AgentListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public get(agentUUID: string): Promise<AgentEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent/" + agentUUID).subscribe({
        next: value => {
          resolve(new AgentEntity(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public update(agentUUID: string, agentUpdateRequest: AgentUpdateRequests): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/agent/" + agentUUID, agentUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }

  public delete(agentUUID: string): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/agent/" + agentUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(new Error(error));
        }
      });
    });
  }
}
