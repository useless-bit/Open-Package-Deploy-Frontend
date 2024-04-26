import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiErrorResponse} from "./reponse/generel/apiErrorResponse";
import {MatSnackbarOptions} from "../../configuration/mat-snackbar/matSnackbarOptions";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private snackbar: MatSnackBar) {
  }

  public showError(data: HttpErrorResponse) {
    if (data.status == 0) {
      this.snackbar.open("Server connection Error", "", MatSnackbarOptions.ErrorNotification);
    } else if (data.status == 400) {
      const apiErrorResponse = data.error as ApiErrorResponse;
      if (apiErrorResponse.message) {
        this.snackbar.open(apiErrorResponse.message, "", MatSnackbarOptions.ErrorNotification);
      } else {
        this.snackbar.open(apiErrorResponse.error, "", MatSnackbarOptions.ErrorNotification);
      }
    } else {
      this.snackbar.open("Error: " + data.status, "", MatSnackbarOptions.ErrorNotification);
    }
  }

  public handleError(data: HttpErrorResponse, bypassError: boolean): string {
    if (!bypassError) {
      this.showError(data);
    }
    let errorResponse = data.error as ApiErrorResponse;
    if (errorResponse.message) {
      return errorResponse.message;
    }
    return errorResponse.error;
  }
}
