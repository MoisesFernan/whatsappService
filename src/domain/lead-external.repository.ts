export default interface LeadExternal {

    sendMsg({message, phone}:{message:string, phone:string}): Promise<any>
    sendSeveralMsg({message, phones}:{message:string, phones:string[]}): Promise<any>
    sendSeveralMsgGroup({message, phones}:{message:string, phones:string[]}): Promise<any>
    getContactss(): Promise<any>
    getChatss(): Promise<any>
    getChatt(phone:number): Promise<any>
    getChatGroup(phone:number): Promise<any>
    getQr(): Promise<any>
    sendMedia(): Promise<any>
    clientLogout(): Promise<any>
    getStatus(): {status: boolean}
    senMediaFromUrl(): Promise<any>
}