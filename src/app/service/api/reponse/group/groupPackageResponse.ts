import {GroupPackage} from "./groupPackage";

export class GroupPackageResponse {
  packages: GroupPackage[];

  constructor(data: any) {
    this.packages = data.packages.map((groupData: any) => new GroupPackage(groupData));
  }
}
