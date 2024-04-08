import {SystemUsageEntity} from "../entity/systemUsageEntity";

export class SystemUsageListResponse {
  systemUsageEntries: SystemUsageEntity[];

  constructor(data: any) {
    this.systemUsageEntries = data.systemUsageEntities.map((systemUsageData: any) => new SystemUsageEntity(systemUsageData)).reverse();
  }
}
