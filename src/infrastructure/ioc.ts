import { ContainerBuilder } from "node-dependency-injection";

import { LeadCreate } from "../application/lead.create";
import { LeadGetChats } from "../application/lead.getchats"
import { LeadGetChat } from "../application/lead.getchat"
import { LeadGetQr } from "../application/lead.getQr";
import { LeadSendSeveralMsg } from "../application/lead.sendSeveralMsg";
import { LeadSendSeveralMsgGroup} from "../application/lead.sendSeveralMsgGroup";
import { LeadLogout } from "../application/lead.logout";
import { LeadStatus } from "../application/lead.status";
import { LeadGetContacts} from "../application/lead.getContacts";

import LeadCtrl from "./controller/lead.ctrl";
import MockRepository from "./repositories/mock.repository";
import WsTransporter from "./repositories/ws.external";
import {LeadGetChatGroup} from "../application/lead.getChatGroup";


const container = new ContainerBuilder();

/**
 * Inicamos servicio de WS / Bot / Twilio
 */
container.register("ws.transporter", WsTransporter);
const wsTransporter = container.get("ws.transporter");

container.register("db.repository", MockRepository);
const dbRepository = container.get("db.repository");

container
  .register("lead.creator", LeadCreate)
  .addArgument([dbRepository, wsTransporter]);
container
    .register("lead.getchats", LeadGetChats)
    .addArgument( wsTransporter);
container
    .register("lead.getchat", LeadGetChat)
    .addArgument( wsTransporter);
container
    .register("lead.getQr", LeadGetQr)
    .addArgument( wsTransporter);
container
    .register("lead.senSeveralMsg", LeadSendSeveralMsg)
    .addArgument( wsTransporter);
container
    .register("lead.logout", LeadLogout)
    .addArgument( wsTransporter);
container
    .register("lead.status", LeadStatus)
    .addArgument( wsTransporter);
container
    .register("lead.getContacts", LeadGetContacts)
    .addArgument( wsTransporter);
container
    .register("lead.sendSeveralMsgGroup", LeadSendSeveralMsgGroup)
    .addArgument( wsTransporter);
container
    .register("lead.getChatGroup", LeadGetChatGroup)
    .addArgument( wsTransporter);


const leadCreator = container.get("lead.creator");
const leadGeterChats = container.get("lead.getchats");
const leadGeterChat = container.get("lead.getchat");
const leadGeterQr = container.get("lead.getQr");
const leadSenderSeveralMsg = container.get("lead.senSeveralMsg");
const leadLogout = container.get("lead.logout");
const leadStatus = container.get("lead.status");
const leadGetContacts = container.get("lead.getContacts");
const leadSendSeveralMsgGroup = container.get("lead.sendSeveralMsgGroup");
const leadGetChatGroup = container.get("lead.getChatGroup");

container.register("lead.ctrl", LeadCtrl).addArgument([
    leadCreator,
    leadGeterChats,
    leadGeterChat,
    leadGeterQr,
    leadSenderSeveralMsg,
    leadLogout,
    leadStatus,
    leadGetContacts,
    leadSendSeveralMsgGroup,
    leadGetChatGroup
]);

export default container;
