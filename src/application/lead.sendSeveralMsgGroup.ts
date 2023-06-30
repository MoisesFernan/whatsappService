import LeadExternal from "../domain/lead-external.repository";

export class LeadSendSeveralMsgGroup {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async send({message, phones}:{message:string, phones:string[]}) {
    return await this.leadExternal.sendSeveralMsgGroup({message, phones});
  }
}
