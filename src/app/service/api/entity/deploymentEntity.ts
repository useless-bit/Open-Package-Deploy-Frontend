export class DeploymentEntity {
  uuid: string;
  agentUuid: string;
  agentName: string;
  packageUuid: string;
  packageName: string;
  isDeployed: boolean;
  expectedReturnValue: string;
  returnValue: string;
  lastDeploymentTime: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.agentUuid = packageData.agentUUID;
    this.agentName = this.formatName(packageData.agentName);
    this.packageUuid = packageData.packageUUID;
    this.packageName = this.formatName(packageData.packageName);
    this.isDeployed = packageData.deployed;
    this.expectedReturnValue = packageData.expectedReturnValue;
    this.returnValue = this.formatName(packageData.returnValue);
    this.lastDeploymentTime = this.formatDate(packageData.lastDeploymentTimestamp);
  }

  formatDate(timestamp: number): string {
    if (timestamp) {
      let dateObj = new Date(timestamp * 1000);
      return dateObj.toLocaleString("en-US", {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        localeMatcher: "best fit"
      });
    }
    return "N/A"
  }


  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }
}
