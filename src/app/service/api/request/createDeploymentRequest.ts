export class CreateDeploymentRequest {
  agentUUID: string;
  packageUUID: string;


  constructor(agentUUID: string, packageUUID: string) {
    this.agentUUID = agentUUID;
    this.packageUUID = packageUUID;
  }
}
