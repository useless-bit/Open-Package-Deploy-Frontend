import {OperatingSystem} from "./operatingSystem";

export class DeploymentEntity {
  uuid: string;
  agentUUID: string;
  packageUUID: string;
  isDeployed: boolean;
  expectedReturnValue: string;
  returnValue: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.agentUUID = packageData.agentUUID;
    this.packageUUID = packageData.packageUUID
    this.isDeployed = packageData.deployed;
    this.expectedReturnValue = this.formatName(packageData.expectedReturnValue);
    this.returnValue = this.formatName(packageData.returnValue);
  }

  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }

  formatStorage(memory: string): string {
    if (memory) {
      const memoryInGigabytes = parseInt(memory, 10) / (1024 * 1024 * 1024);
      return memoryInGigabytes.toFixed(2).toString() + " GB";
    }
    return "N/A"
  }
}
