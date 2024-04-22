import {PackageEntity} from "../../entity/packageEntity";

export class PackageListResponse {
  packages: PackageEntity[];

  constructor(data: any) {
    this.packages = data.packages.map((agentData: any) => new PackageEntity(agentData));
  }
}
