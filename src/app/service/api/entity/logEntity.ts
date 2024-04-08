import {LogSeverity} from "./logSeverity";

export class LogEntity {
  timestamp: Date | string;
  severity: LogSeverity;
  message: string;


  constructor(logData: any) {
    this.timestamp = this.formatDate(logData.timestamp);
    this.severity = logData.severity;
    this.message = logData.message;
  }

  formatDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

}
