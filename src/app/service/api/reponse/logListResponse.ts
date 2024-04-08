import {SystemUsageEntity} from "../entity/systemUsageEntity";
import {LogEntity} from "../entity/logEntity";

export class LogListResponse {
  logEntries: LogEntity[];

  constructor(data: any) {
    this.logEntries = data.logEntries.map((logData: any) => new LogEntity(logData));
  }
}
