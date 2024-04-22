export class ServerAgentInstallRetryRequest {
  installRetryInterval: number;


  constructor(installRetryInterval: number) {
    this.installRetryInterval = installRetryInterval;
  }
}
