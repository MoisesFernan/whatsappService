import LeadExternal from "../domain/lead-external.repository";

export class LeadStatus {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public getStatus() {
    return this.leadExternal.getStatus();
  }
}
