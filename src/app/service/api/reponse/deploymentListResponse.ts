import {DeploymentEntity} from "../entity/deploymentEntity";

export class DeploymentListResponse {
  deployments: DeploymentEntity[];

  constructor(data: any) {
    this.deployments = data.deployments.map((deploymentData: any) => new DeploymentEntity(deploymentData));
  }
}
