import {OperatingSystem} from "../entity/operatingSystem";

export class AddNewPackageRequest {
  packageName: string;
  packageChecksum: string;
  operatingSystem: OperatingSystem;


  constructor(packageName: string, packageChecksum: string, operatingSystem: OperatingSystem) {
    this.packageName = packageName;
    this.packageChecksum = packageChecksum;
    this.operatingSystem = operatingSystem;
  }
}
