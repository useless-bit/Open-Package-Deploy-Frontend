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
      let dateObj = new Date(timestamp * 1000);
      return  dateObj.toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, localeMatcher: "best fit"});    }
    return "N/A"
  }

  formatOsName(osName: string): string {
    if (osName) {
      return osName;
    }
    return "N/A"
  }
}
