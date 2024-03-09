import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariableService} from "../variable/variable.service";
import {ApiService} from "./api.service";
import {GetRegistrationTokenResponse} from "./reponse/getRegistrationTokenResponse";

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
          const response = value as GetRegistrationTokenResponse;
          resolve(response.registrationToken);
        },
        error: (error) => {
          this.apiService.errorHandling(error);
          reject(null);
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
          reject(null);
        }
      });
    });
  }

}
