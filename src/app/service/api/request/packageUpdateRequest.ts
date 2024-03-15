export class PackageUpdateRequest {
  packageName: string | null;
  expectedReturnValue: string | null;


  constructor(packageName: string | null, expectedReturnValue: string | null) {
    this.packageName = packageName;
    this.expectedReturnValue = expectedReturnValue;
  }
}
