import {MatSnackBarConfig} from "@angular/material/snack-bar";


export const MatSnackbarOptions = {
  ErrorNotification: <MatSnackBarConfig>{duration: 5000, panelClass: "snackbar-error"},
  InfoNotification: <MatSnackBarConfig>{duration: 5000, panelClass: "snackbar-info"}
}
