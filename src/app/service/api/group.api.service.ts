import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {VariableService} from "../variable/variable.service";
import {GroupListResponse} from "./reponse/group/groupListResponse";
import {GroupEntity} from "./entity/groupEntity";
import {GroupCreateEmptyRequest} from "./request/group/groupCreateEmptyRequest";
import {GroupUpdateRequest} from "./request/group/groupUpdateRequest";
import {GroupMemberResponse} from "./reponse/group/groupMemberResponse";
import {GroupPackageResponse} from "./reponse/group/groupPackageResponse";

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(bypassError: boolean = false): Promise<GroupListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group").subscribe({
        next: value => {
          resolve(new GroupListResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public get(groupUUID: string, bypassError: boolean = false): Promise<GroupEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/" + groupUUID).subscribe({
        next: value => {
          resolve(new GroupEntity(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public delete(groupUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/group/" + groupUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public update(groupUUID: string, groupUpdateRequest: GroupUpdateRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/group/" + groupUUID, groupUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public create(createEmptyGroupRequest: GroupCreateEmptyRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/group", createEmptyGroupRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getMembers(groupUUID: string, bypassError: boolean = false): Promise<GroupMemberResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/" + groupUUID + "/member").subscribe({
        next: value => {
          resolve(new GroupMemberResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getPackages(groupUUID: string, bypassError: boolean = false): Promise<GroupPackageResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/" + groupUUID + "/package").subscribe({
        next: value => {
          resolve(new GroupPackageResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public addMember(groupUUID: string, agentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/group/" + groupUUID + "/member/" + agentUUID, null).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public removeMember(groupUUID: string, agentUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/group/" + groupUUID + "/member/" + agentUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public addPackage(groupUUID: string, packageUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.variableService.backendURL + "/api/group/" + groupUUID + "/package/" + packageUUID, null).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public removePackage(groupUUID: string, packageUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/group/" + groupUUID + "/package/" + packageUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getJoinedGroups(agentUUID: string, bypassError: boolean = false): Promise<GroupListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/agent/" + agentUUID).subscribe({
        next: value => {
          resolve(new GroupListResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

  public getDeployedGroups(packageUUID: string, bypassError: boolean = false): Promise<GroupListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/group/package/" + packageUUID).subscribe({
        next: value => {
          resolve(new GroupListResponse(value));
        },
        error: (error) => {
          reject(new Error(this.apiService.handleError(error, bypassError)))
        }
      });
    });
  }

}
