import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {VariableService} from "../variable/variable.service";
import {GroupListResponse} from "./reponse/group/groupListResponse";
import {GroupEntity} from "./entity/groupEntity";
import {CreateEmptyGroupRequest} from "./request/group/createEmptyGroupRequest";
import {GroupUpdateRequest} from "./request/group/groupUpdateRequest";

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(): Promise<GroupListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group").subscribe({
        next: value => {
          resolve(new GroupListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error)
        }
      });
    });
  }

  public get(groupUUID: string): Promise<GroupEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/" + groupUUID).subscribe({
        next: value => {
          resolve(new GroupEntity(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error)
        }
      });
    });
  }

  public delete(groupUUID: string): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/group/" + groupUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public update(groupUUID: string, groupUpdateRequest: GroupUpdateRequest): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/group/" + groupUUID, groupUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(error);
        }
      });
    });
  }

  public create(createEmptyGroupRequest: CreateEmptyGroupRequest, bypassError: boolean): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/group", createEmptyGroupRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          if (!bypassError) {
            this.apiService.errorHandling(error);
          }
          reject(error);
        }
      });
    });
  }

}
