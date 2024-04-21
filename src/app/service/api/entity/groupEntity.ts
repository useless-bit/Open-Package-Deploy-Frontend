import {OperatingSystem} from "./operatingSystem";

export class GroupEntity {
  uuid: string;
  name: string;
  description: string;
  operatingSystem: OperatingSystem;
  memberCount: number;
  packageCount: number;


  constructor(groupData: any) {
    this.uuid = groupData.uuid;
    this.name = groupData.name;
    this.description = groupData.description;
    this.operatingSystem = groupData.operatingSystem;
    this.memberCount = groupData.memberCount;
    this.packageCount = groupData.packageCount;
  }
}
