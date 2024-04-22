export class GroupUpdateRequest {
  name: string | null;
  description: string | null | undefined


  constructor(name: string | null, description: string | undefined) {
    this.name = name;
    this.description = description;
  }
}
