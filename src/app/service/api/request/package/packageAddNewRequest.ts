import {OperatingSystem} from "../../entity/operatingSystem";

export class PackageAddNewRequest {
  packageName: string;
  expectedReturnValue: string
  packageChecksum: string;
  operatingSystem: OperatingSystem;


  constructor(packageName: string, expectedReturnValue: string, packageChecksum: string, operatingSystem: OperatingSystem) {
    this.packageName = packageName;
    this.expectedReturnValue = expectedReturnValue
    this.packageChecksum = packageChecksum;
    this.operatingSystem = operatingSystem;
  }
}
