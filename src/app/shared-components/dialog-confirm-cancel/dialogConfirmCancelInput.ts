export class DialogConfirmCancelInput {
  dialogTitle: string;
  dialogMessage: string;
  cancelButtonMessage: string;
  acceptButtonMessage: string;


  constructor(dialogTitle: string, dialogMessage: string, cancelButtonMessage: string, acceptButtonMessage: string) {
    this.dialogTitle = dialogTitle;
    this.dialogMessage = dialogMessage;
    this.cancelButtonMessage = cancelButtonMessage;
    this.acceptButtonMessage = acceptButtonMessage;
  }
}
