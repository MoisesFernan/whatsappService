import LeadExternal from "../domain/lead-external.repository";

export class LeadGetContacts {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public getContacts() {
    return this.leadExternal.getContactss();
  }
}
