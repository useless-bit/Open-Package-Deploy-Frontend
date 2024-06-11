import {OperatingSystem} from "./operatingSystem";
import {UnitConversionUtility} from "../../../utility/unitConversionUtility";

export class AgentEntity {
  uuid: string;
  name: string;
  lastConnectionTime: string | Date;
  registrationCompleted: boolean;
  checksum: string;
  operatingSystem: OperatingSystem;
  operatingSystemFamily: string;
  operatingSystemArchitecture: string;
  operatingSystemVersion: string;
  operatingSystemCodeName: string;
  operatingSystemBuildNumber: string;
  memory: string;
  cpuName: string;
  cpuArchitecture: string;
  cpuLogicalCores: string;
  cpuPhysicalCores: string;
  cpuSockets: string;

  constructor(agentData: any) {
    this.uuid = agentData.uuid;
    this.name = agentData.name;
    this.lastConnectionTime = this.formatDate(agentData.lastConnectionTime);
    this.registrationCompleted = agentData.registrationCompleted;
    this.checksum = this.formatName(agentData.checksum)
    this.operatingSystem = agentData.operatingSystem;
    this.operatingSystemFamily = this.formatName(agentData.operatingSystemFamily);
    this.operatingSystemArchitecture = this.formatName(agentData.operatingSystemArchitecture);
    this.operatingSystemVersion = this.formatName(agentData.operatingSystemVersion);
    this.operatingSystemCodeName = this.formatName(agentData.operatingSystemCodeName);
    this.operatingSystemBuildNumber = this.formatName(agentData.operatingSystemBuildNumber);
    this.memory = this.formatStorage(agentData.memory);
    this.cpuName = this.formatName(agentData.cpuName);
    this.cpuArchitecture = this.formatName(agentData.cpuArchitecture);
    this.cpuLogicalCores = this.formatName(agentData.cpuLogicalCores);
    this.cpuPhysicalCores = this.formatName(agentData.cpuPhysicalCores);
    this.cpuSockets = this.formatName(agentData.cpuSockets);
  }

  formatDate(timestamp: number): string | Date {
    if (timestamp) {
      return new Date(timestamp * 1000);
    }
    return "N/A"
  }

  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }

  formatStorage(memory: number): string {
    if (memory) {
      return UnitConversionUtility.byteToString(memory);
    }
    return "N/A"
  }
}
