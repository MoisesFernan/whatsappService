"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class LeadCtrl {
    constructor(leads
    //private readonly leadCreator: LeadCreate,
    //private readonly leadGeChats: LeadGetChats
    ) {
        this.sendCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { message, phone } = body;
            const response = yield this.leadCreator.sendMessageAndSave({ message, phone });
            res.send(response);
        });
        this.getChatsCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.leadGetChats.getChats();
            res.send(response);
        });
        this.getChatCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { phone } = body;
            const response = yield this.leadGetChat.getChat(phone);
            //res.send(this.leadGetChats.getChats());
            res.send(response);
        });
        this.getQrCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.leadGetQr.getQr();
            res.send(response);
        });
        this.sendSeveralMsgCtrl = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { message, phones } = body;
            const response = yield this.leadSendSeveralMsg.send({ message, phones })
            res.send(response);
            //res.send("sendSeveralMsgCtrl");
        });
        const [leadCreatorUseCase, leadGetChatsUseCase, leadGetChat, leadGetQr, leadSendSeveralMsg] = leads;
        this.leadCreator = leadCreatorUseCase;
        this.leadGetChats = leadGetChatsUseCase;
        this.leadGetChat = leadGetChat;
        this.leadGetQr = leadGetQr;
        this.leadSendSeveralMsg = leadSendSeveralMsg;
    }
}
exports.default = LeadCtrl;
