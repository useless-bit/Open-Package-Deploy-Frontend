export class GroupPackage {
  uuid: string;
  name: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;

  }
}
