import {AgentEntity} from "../../entity/agentEntity";

export class AgentListResponse {
  agents: AgentEntity[];

  constructor(data: any) {
    this.agents = data.agents.map((agentData: any) => new AgentEntity(agentData));
  }
}
