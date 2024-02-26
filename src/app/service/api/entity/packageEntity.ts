export class PackageEntity {
  uuid: string;
  name: string;
  packageStatus: string;
  checksumPlaintext: string;
  checksumEncrypted: string;
  targetOperatingSystem: string;
  plaintextSize: string;
  encryptedSize: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;
    this.packageStatus = this.formatName(packageData.packageStatusInternal);
    this.checksumPlaintext = this.formatName(packageData.checksumPlaintext);
    this.checksumEncrypted = this.formatName(packageData.checksumEncrypted);
    this.targetOperatingSystem = this.formatName(packageData.targetOperatingSystem);
    this.plaintextSize = this.formatStorage(packageData.plaintextSize);
    this.encryptedSize = this.formatStorage(packageData.encryptedSize);
  }

  formatDate(timestamp: number): string {
    if (timestamp) {
      let dateObj = new Date(timestamp * 1000);
      return dateObj.toLocaleString("en-US", {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        localeMatcher: "best fit"
      });
    }
    return "N/A"
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
