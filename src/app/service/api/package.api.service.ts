import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {PackageListResponse} from "./reponse/packageListResponse";
import {PackageEntity} from "./entity/packageEntity";
import {Observable} from "rxjs";
import {PackageUpdateRequest} from "./request/packageUpdateRequest";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PackageApiService {

  constructor(private httpClient: HttpClient,
              private variableService: VariableService,
              private apiService: ApiService) {
  }

  public getAll(): Promise<PackageListResponse | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/package").subscribe({
        next: value => {
          resolve(new PackageListResponse(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public get(packageUUID: string): Promise<PackageEntity | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.variableService.backendURL + "/api/package/" + packageUUID).subscribe({
        next: value => {
          resolve(new PackageEntity(value));
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
        }
      });
    });
  }

  public delete(packageUUID: string): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.variableService.backendURL + "/api/package/" + packageUUID).subscribe({
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

  public addNew(formData: FormData): Observable<Object | null> {
    return this.httpClient.post<Object | null>(this.variableService.backendURL + "/api/package", formData, {
      reportProgress: true,
      observe: "events"
    });
  }

  public update(packageUUID: string, packageUpdateRequest: PackageUpdateRequest): Promise<void | null> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(this.variableService.backendURL + "/api/package/" + packageUUID, packageUpdateRequest).subscribe({
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
