import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {PackageListResponse} from "./reponse/package/packageListResponse";
import {PackageEntity} from "./entity/packageEntity";
import {Observable} from "rxjs";
import {PackageUpdateRequest} from "./request/package/packageUpdateRequest";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PackageApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(bypassError: boolean = false): Promise<PackageListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/package").subscribe({
        next: value => {
          resolve(new PackageListResponse(value));
        },
        error: (error) => {
          new Error(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public get(packageUUID: string, bypassError: boolean = false): Promise<PackageEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/package/" + packageUUID).subscribe({
        next: value => {
          resolve(new PackageEntity(value));
        },
        error: (error) => {
          new Error(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public delete(packageUUID: string, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/package/" + packageUUID).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          new Error(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public addNew(formData: FormData): Observable<Object | null> {
    return this.httpClient.post<Object | null>(this.variableService.backendURL + "/api/package", formData, {
      reportProgress: true,
      observe: "events"
    });
  }

  public update(packageUUID: string, packageUpdateRequest: PackageUpdateRequest, bypassError: boolean = false): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/package/" + packageUUID, packageUpdateRequest).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          new Error(this.apiService.handleError(error, bypassError))
        }
      });
    });
  }

  public updateContent(packageUUID: string, formData: FormData): Observable<Object | null> {
    return this.httpClient.patch<Object | null>(this.variableService.backendURL + "/api/package/" + packageUUID + "/content", formData, {
      reportProgress: true,
      observe: "events"
    });
  }

}
