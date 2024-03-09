import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ApiErrorResponse} from "./reponse/apiErrorResponse";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private snackbar: MatSnackBar) {
  }

  public errorHandling(data: HttpErrorResponse) {
    const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
    snackBarConfig.verticalPosition = 'top';
    snackBarConfig.horizontalPosition = 'right';
    snackBarConfig.duration = 5000;
    snackBarConfig.panelClass = ["notification", "error"]
    if (data.status == 0) {
      this.snackbar.open("Server connection Error", "", {duration: 5000, panelClass: "notification-error"});
    } else if (data.status == 400) {
      const apiErrorResponse = data.error as ApiErrorResponse;
      if (apiErrorResponse.message) {
        this.snackbar.open(apiErrorResponse.message, "", {
          duration: 5000,
          panelClass: "notification-error"
        });
      } else {
        this.snackbar.open(apiErrorResponse.error, "", {
          duration: 5000,
          panelClass: "notification-error"
        });
      }
    } else {
      this.snackbar.open("Error: " + data.status, "", snackBarConfig);
    }
  }
}
