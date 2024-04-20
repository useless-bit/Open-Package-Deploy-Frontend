export class GroupEntity {
  uuid: string;
  name: string;
  description: string;


  constructor(packageData: any) {
    this.uuid = packageData.uuid;
    this.name = packageData.name;
    this.description = this.formatName(packageData.description);
  }



  formatName(name: string): string {
    if (name) {
      return name;
    }
    return "N/A"
  }
}
