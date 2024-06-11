export class DeploymentEntity {
  uuid: string;
  agentUuid: string;
  agentName: string;
  packageUuid: string;
  packageName: string;
  deployed: boolean;
  directDeployment: boolean;
  expectedReturnValue: string;
  returnValue: string;
  lastDeploymentTime: string;


  constructor(deploymentData: any) {
    this.uuid = deploymentData.uuid;
    this.agentUuid = deploymentData.agentUUID;
    this.agentName = this.formatName(deploymentData.agentName);
    this.packageUuid = deploymentData.packageUUID;
    this.packageName = this.formatName(deploymentData.packageName);
    this.deployed = deploymentData.deployed;
    this.expectedReturnValue = deploymentData.expectedReturnValue;
    this.returnValue = this.formatName(deploymentData.returnValue);
    this.lastDeploymentTime = this.formatDate(deploymentData.lastDeploymentTimestamp);
    this.directDeployment = deploymentData.directDeployment
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
