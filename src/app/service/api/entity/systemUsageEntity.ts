export class SystemUsageEntity {
  timestamp: Date;
  cpuUsage: number;
  memoryTotal: number;
  memoryAvailable: number;


  constructor(systemUsageData: any) {
    this.timestamp = this.formatDate(systemUsageData.timestamp);
    this.cpuUsage = systemUsageData.cpuUsage;
    this.memoryTotal = systemUsageData.memoryTotal;
    this.memoryAvailable = systemUsageData.memoryAvailable;
  }

  formatDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

}
