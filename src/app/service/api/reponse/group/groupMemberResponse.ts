import {GroupMember} from "./groupMember";

export class GroupMemberResponse {
  members: GroupMember[];

  constructor(data: any) {
    this.members = data.members.map((groupData: any) => new GroupMember(groupData));
  }
}
