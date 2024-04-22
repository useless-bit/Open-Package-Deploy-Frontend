export class PackageUpdateContentRequest {
  packageChecksum: string;


  constructor(packageChecksum: string) {
    this.packageChecksum = packageChecksum;
  }
}
