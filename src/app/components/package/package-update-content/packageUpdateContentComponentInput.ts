import {PackageEntity} from "../../../service/api/entity/packageEntity";

export class PackageUpdateContentComponentInput {
  packageEntity: PackageEntity


  constructor(packageEntity: PackageEntity) {
    this.packageEntity = packageEntity;
  }
}
