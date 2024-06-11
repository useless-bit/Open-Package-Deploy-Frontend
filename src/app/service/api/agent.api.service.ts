import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {AgentListResponse} from "./reponse/agent/agentListResponse";
import {AgentEntity} from "./entity/agentEntity";
import {AgentUpdateRequests} from "./request/agent/agentUpdateRequest";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AgentApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(bypassError: boolean = false): Promise<AgentListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent").subscribe({
        next: value => {
          resolve(new AgentListResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public get(agentUUID: string, bypassError: boolean = false): Promise<AgentEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/agent/" + agentUUID).subscribe({
        next: value => {
          resolve(new AgentEntity(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public update(agentUUID: string, agentUpdateRequest: AgentUpdateRequests, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/agent/" + agentUUID, agentUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public delete(agentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/agent/" + agentUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }
}
