export class AgentEntity {
  uuid: string;
  name: string;
  lastConnectionTime: string;
  operatingSystemName: string;
  registrationCompleted: boolean;

  constructor(agentData: any) {
    this.uuid = agentData.uuid;
    this.name = agentData.name;
    this.lastConnectionTime = this.formatDate(agentData.lastConnectionTime);
    this.operatingSystemName = this.formatOsName(agentData.operatingSystemName);
    this.registrationCompleted = agentData.registrationCompleted;
  }

  formatDate(timestamp: number): string {
    if (timestamp) {
      let dateObj = new Date(timestamp * 100); // Convert from seconds to milliseconds
      return dateObj.toLocaleString(); // Format the date as a string
    }
    return "N/A"
  }

  formatOsName(osName: string): string {
    if (osName) {
      return osName; // Format the date as a string
    }
    return "N/A"
  }
}
