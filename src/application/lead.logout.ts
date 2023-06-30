import LeadExternal from "../domain/lead-external.repository";

export class LeadLogout {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async logout() {
    return await this.leadExternal.clientLogout();
  }
}
