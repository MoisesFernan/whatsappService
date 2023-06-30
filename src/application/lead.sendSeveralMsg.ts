import LeadExternal from "../domain/lead-external.repository";

export class LeadSendSeveralMsg {

  private leadExternal: LeadExternal;
  constructor(leadExternal: LeadExternal) {
    this.leadExternal = leadExternal;
  }

  public async send({message, phones}:{message:string, phones:string[]}) {
    return await this.leadExternal.sendSeveralMsg({message, phones});
    //return await this.leadExternal.sendMedia();
    ///return await this.leadExternal.senMediaFromUrl();
  }
}
