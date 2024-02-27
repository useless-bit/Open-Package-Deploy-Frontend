import {OperatingSystem} from "./operatingSystem";

export class PackageEntity {
  uuid: string;
  name: string;
  packageStatus: string;
  checksumPlaintext: string;
  checksumEncrypted: string;
  targetOperatingSystem: OperatingSystem;
  plaintextSize: string;
  encryptedSize: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;
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

  formatStorage(memory: string): string {
    if (memory) {
      const memoryInGigabytes = parseInt(memory, 10) / (1024 * 1024 * 1024);
      return memoryInGigabytes.toFixed(2).toString() + " GB";
    }
    return "N/A"
  }
}
