"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_dependency_injection_1 = require("node-dependency-injection");
const lead_create_1 = require("../application/lead.create");
const lead_getchats_1 = require("../application/lead.getchats");
const lead_getchat_1 = require("../application/lead.getchat");
const lead_getQr_1 = require("../application/lead.getQr");
const lead_sendSeveralMsg_1 = require("../application/lead.sendSeveralMsg");
const lead_logout_1 = require("../application/lead.logout");
const lead_status_1 = require("../application/lead.status");
const lead_ctrl_1 = __importDefault(require("./controller/lead.ctrl"));
const mock_repository_1 = __importDefault(require("./repositories/mock.repository"));
const ws_external_1 = __importDefault(require("./repositories/ws.external"));
const container = new node_dependency_injection_1.ContainerBuilder();
/**
 * Inicamos servicio de WS / Bot / Twilio
 */
container.register("ws.transporter", ws_external_1.default);
const wsTransporter = container.get("ws.transporter");
container.register("db.repository", mock_repository_1.default);
const dbRepository = container.get("db.repository");
container
    .register("lead.creator", lead_create_1.LeadCreate)
    .addArgument([dbRepository, wsTransporter]);
container
    .register("lead.getchats", lead_getchats_1.LeadGetChats)
    .addArgument(wsTransporter);
container
    .register("lead.getchat", lead_getchat_1.LeadGetChat)
    .addArgument(wsTransporter);
container
    .register("lead.getQr", lead_getQr_1.LeadGetQr)
    .addArgument(wsTransporter);
container
    .register("lead.senSeveralMsg", lead_sendSeveralMsg_1.LeadSendSeveralMsg)
    .addArgument(wsTransporter);
container
    .register("lead.logout", lead_logout_1.LeadLogout)
    .addArgument(wsTransporter);
container
    .register("lead.status", lead_status_1.LeadStatus)
    .addArgument(wsTransporter);
const leadCreator = container.get("lead.creator");
const leadGeterChats = container.get("lead.getchats");
const leadGeterChat = container.get("lead.getchat");
const leadGeterQr = container.get("lead.getQr");
const leadSenderSeveralMsg = container.get("lead.senSeveralMsg");
const leadLogout = container.get("lead.logout");
const leadStatus = container.get("lead.status");
container.register("lead.ctrl", lead_ctrl_1.default).addArgument([leadCreator, leadGeterChats, leadGeterChat, leadGeterQr, leadSenderSeveralMsg, leadLogout, leadStatus]);
exports.default = container;
