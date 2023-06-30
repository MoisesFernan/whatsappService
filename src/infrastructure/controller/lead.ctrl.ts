import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";
import { LeadGetChats } from "../../application/lead.getchats";
import { LeadGetChat } from "../../application/lead.getchat"
import { LeadGetQr } from "../../application/lead.getQr";
import {LeadSendSeveralMsg} from "../../application/lead.sendSeveralMsg";
import {LeadLogout} from "../../application/lead.logout";
import {LeadStatus} from "../../application/lead.status";
import {LeadGetContacts} from "../../application/lead.getContacts";
import {LeadSendSeveralMsgGroup} from "../../application/lead.sendSeveralMsgGroup";
import {LeadGetChatGroup} from "../../application/lead.getChatGroup";

class LeadCtrl {
    private leadCreator: LeadCreate
    private leadGetChats: LeadGetChats
    private leadGetChat: LeadGetChat
    private leadGetQr: LeadGetQr
    private leadSendSeveralMsg: LeadSendSeveralMsg
    private leadLogout: LeadLogout
    private leadStatus: LeadStatus
    private leadGetContacts: LeadGetContacts
    private leadSendSeveralMsgGroup: LeadSendSeveralMsgGroup
    private leadGetChatGroup: LeadGetChatGroup
    constructor( leads: [
        LeadCreate,
        LeadGetChats,
        LeadGetChat,
        LeadGetQr,
        LeadSendSeveralMsg,
        LeadLogout,
        LeadStatus,
        LeadGetContacts,
        LeadSendSeveralMsgGroup,
        LeadGetChatGroup
    ]
      //private readonly leadCreator: LeadCreate,
      //private readonly leadGeChats: LeadGetChats
  ) {
    const [
        leadCreatorUseCase,
        leadGetChatsUseCase,
        leadGetChat,
        leadGetQr,
        leadSendSeveralMsg,
        leadLogout,
        leadStatus,
        leadGetContacts,
        leadSendSeveralMsgGroup,
        leadGetChatGroup
    ] = leads;
        this.leadCreator = leadCreatorUseCase;
        this.leadGetChats = leadGetChatsUseCase;
        this.leadGetChat = leadGetChat
        this.leadGetQr = leadGetQr
        this.leadSendSeveralMsg = leadSendSeveralMsg
        this.leadLogout = leadLogout
        this.leadStatus = leadStatus
        this.leadGetContacts = leadGetContacts
        this.leadSendSeveralMsgGroup = leadSendSeveralMsgGroup
        this.leadGetChatGroup = leadGetChatGroup
    }

    public sendCtrl = async ({ body }: Request, res: Response) => {
        const { message, phone } = body;
        const response = await this.leadCreator.sendMessageAndSave({ message, phone })
        res.send(response);
    };

    public getChatsCtrl = async (req: Request, res: Response) => {
        const response = await this.leadGetChats.getChats();
        res.send(response);
    }

    public getChatCtrl = async({ body }: Request, res: Response) => {
        const { phone } = body;
        const response = await this.leadGetChat.getChat(phone);
        res.send(response);
    }

    public getQrCtrl = async (req: Request, res: Response) => {
        const response = await this.leadGetQr.getQr();
        res.send(response);
    }

    public sendSeveralMsgCtrl = async ({ body }: Request, res: Response) => {
        const { message, phones } = body;
        const response = await this.leadSendSeveralMsg.send({ message, phones })
        res.send(response);
    }

    public sendSeveralMsgGroupCtrl = async ({ body }: Request, res: Response) => {
        const { message, phones } = body;
        const response = await this.leadSendSeveralMsgGroup.send({ message, phones })
        res.send(response);
    }

    public logoutCtrl = async ({ body }: Request, res: Response) => {
        const response = await this.leadLogout.logout();
        res.send(response);
    }

    public statusCtrl = ({ body }: Request, res: Response) => {
        const response = this.leadStatus.getStatus();
        res.send(response);
    }

    public getContactsCtrl = async (req: Request, res: Response) => {
        const response = await this.leadGetContacts.getContacts();
        res.send(response);
    }

    public getChatGroupCtrl = async({ body }: Request, res: Response) => {
        const { phone } = body;
        const response = await this.leadGetChatGroup.getChatGroup(phone);
        res.send(response);
    }
}
export default LeadCtrl;
