import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadGetChat {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async getChat(phone:number) {
    return await this.leadExternal.getChatt(phone);
  }
}
