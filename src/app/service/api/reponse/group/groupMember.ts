export class GroupMember {
  uuid: string;
  name: string;


  constructor(memberData: any) {
    this.uuid = memberData.uuid;
    this.name = memberData.name;

  }
}
