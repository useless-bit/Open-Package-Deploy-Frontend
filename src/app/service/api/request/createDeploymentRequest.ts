export class CreateDeploymentRequest {
  agentUUID: string;
  packageUUID: string;
  expectedReturnValue: string;


  constructor(agentUUID: string, packageUUID: string, expectedReturnValue: string) {
    this.agentUUID = agentUUID;
    this.packageUUID = packageUUID;
    this.expectedReturnValue = expectedReturnValue;
  }
}
