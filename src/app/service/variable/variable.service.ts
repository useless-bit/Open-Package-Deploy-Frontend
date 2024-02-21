import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private _backendURL!: string
  private _frontendURL!: string
  private _keycloakRealm!: string
  private _keycloakUrl!: string
  private _keycloakClientId!: string

  get backendURL() {
    return this._backendURL;
  }

  get frontendURL() {
    return this._frontendURL;
  }

  get keycloakRealm() {
    return this._keycloakRealm;
  }

  get keycloakUrl() {
    return this._keycloakUrl;
  }

  get keycloakClientId() {
    return this._keycloakClientId;
  }

  constructor(private httpClient: HttpClient) {
    this.loadVariables().then()
  }

  public async loadVariables(): Promise<void> {
    return new Promise((resolve) => {
      if (environment.production) {
        this.httpClient.get('assets/variables.txt', {responseType: 'text'}).subscribe({
          next: (data: string) => {
            const lines = data.split('\n');
            for (const line of lines) {
              if (!line) continue; // Skip empty lines
              const [key, value] = line.split('=');
              switch (key) {
                case 'TASKFLARE_BACKEND_URL':
                  this._backendURL = value;
                  break;
                case 'TASKFLARE_FRONTEND_URL':
                  this._frontendURL = value;
                  break;
                case 'KEYCLOAK_REALM':
                  this._keycloakRealm = value;
                  break;
                case 'KEYCLOAK_CLIENT_ID':
                  this._keycloakClientId = value;
                  break;
                case 'KEYCLOAK_URL':
                  this._keycloakUrl = value;
                  break;
              }
            }
            resolve()
          }
        });
      } else {
        this._backendURL = "http://localhost:8080"
        this._frontendURL = "http://localhost:4200"
        this._keycloakRealm = 'master'
        this._keycloakUrl = 'http://localhost:8888/'
        this._keycloakClientId = 'OPD'
        resolve()
      }
    })
  }
}