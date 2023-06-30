import LeadExternal from "../domain/lead-external.repository";

export class LeadGetChatGroup {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

    public async getChatGroup(phone:number) {
        return await this.leadExternal.getChatGroup(phone);
    }
}
