import {OperatingSystem} from "./operatingSystem";

export class GroupEntity {
  uuid: string;
  name: string;
  description: string;
  operatingSystem: OperatingSystem;
  memberCount: number;
  packageCount: number;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;
    this.description = this.formatName(packageData.description);
    this.operatingSystem = packageData.operatingSystem;
    this.memberCount = packageData.memberCount;
    this.packageCount = packageData.packageCount;
  }


  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }
}
