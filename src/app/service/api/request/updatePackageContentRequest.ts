export class UpdatePackageContentRequest {
  packageChecksum: string;


  constructor(packageChecksum: string) {
    this.packageChecksum = packageChecksum;
  }
}
