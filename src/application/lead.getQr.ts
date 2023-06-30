import LeadExternal from "../domain/lead-external.repository";

export class LeadGetQr {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async getQr() {
    return await this.leadExternal.getQr();
  }
}
