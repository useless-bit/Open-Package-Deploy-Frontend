import {OperatingSystem} from "../../entity/operatingSystem";

export class CreateEmptyGroupRequest {
  name: string;
  description: string;
  operatingSystem: OperatingSystem;



  constructor(name: string, description: string, operatingSystem: OperatingSystem) {
    this.name = name;
    this.description = description;
    this.operatingSystem = operatingSystem;
  }
}
