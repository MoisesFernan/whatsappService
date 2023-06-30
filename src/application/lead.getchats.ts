import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadGetChats {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async getChats() {
    return await this.leadExternal.getChatss();
  }
}
