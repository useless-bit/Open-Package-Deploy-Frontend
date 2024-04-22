import {LogEntity} from "../../entity/logEntity";

export class ServerLogListResponse {
  logEntries: LogEntity[];

  constructor(data: any) {
    this.logEntries = data.logEntries.map((logData: any) => new LogEntity(logData));
  }
}
