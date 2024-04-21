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
    this.description = packageData.description;
    this.operatingSystem = packageData.operatingSystem;
    this.memberCount = packageData.memberCount;
    this.packageCount = packageData.packageCount;
  }
}
