import {OperatingSystem} from "./operatingSystem";
import {UnitConversionUtility} from "../../../utility/unitConversionUtility";

export class PackageEntity {
  uuid: string;
  name: string;
  expectedReturnValue: string;
  packageStatus: string;
  checksumPlaintext: string;
  checksumEncrypted: string;
  targetOperatingSystem: OperatingSystem;
  plaintextSize: string;
  encryptedSize: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;
    this.expectedReturnValue = packageData.expectedReturnValue;
    this.packageStatus = this.formatName(packageData.packageStatusInternal);
    this.checksumPlaintext = this.formatName(packageData.checksumPlaintext);
    this.checksumEncrypted = this.formatName(packageData.checksumEncrypted);
    this.targetOperatingSystem = packageData.targetOperatingSystem;
    this.plaintextSize = this.formatStorage(packageData.plaintextSize);
    this.encryptedSize = this.formatStorage(packageData.encryptedSize);
  }

  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }

  formatStorage(memory: number): string {
    if (memory) {
      return UnitConversionUtility.byteToString(memory)
    }
    return "N/A"
  }
}
