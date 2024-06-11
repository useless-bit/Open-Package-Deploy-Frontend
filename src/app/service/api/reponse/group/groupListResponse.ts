import {GroupEntity} from "../../entity/groupEntity";

export class GroupListResponse {
  groups: GroupEntity[];

  constructor(data: any) {
    this.groups = data.groups.map((groupData: any) => new GroupEntity(groupData));
  }
}
