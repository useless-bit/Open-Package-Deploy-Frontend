export class DialogTextInputData {
  dialogTitle: string;
  dialogMessage: string;
  cancelButtonMessage: string;
  acceptButtonMessage: string;
  allowEmptyValue: boolean;


  constructor(dialogTitle: string, dialogMessage: string, cancelButtonMessage: string, acceptButtonMessage: string, allowEmptyValue: boolean) {
    this.dialogTitle = dialogTitle;
    this.dialogMessage = dialogMessage;
    this.cancelButtonMessage = cancelButtonMessage;
    this.acceptButtonMessage = acceptButtonMessage;
    this.allowEmptyValue = allowEmptyValue;
  }
}
