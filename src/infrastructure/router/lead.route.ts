import express, { Router } from "express";
import LeadCtrl from "../controller/lead.ctrl";
import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */



const leadCtrl: LeadCtrl = container.get("lead.ctrl");
router.post("/", leadCtrl.sendCtrl);
router.get("/", leadCtrl.getChatsCtrl);
router.post("/chat", leadCtrl.getChatCtrl);
router.get("/qr", leadCtrl.getQrCtrl);
router.post("/send-several-msgs", leadCtrl.sendSeveralMsgCtrl);
router.post("/send-several-msgs-group", leadCtrl.sendSeveralMsgGroupCtrl);
router.post("/logout", leadCtrl.logoutCtrl);
router.get("/status", leadCtrl.statusCtrl);
router.get("/contacts", leadCtrl.getContactsCtrl);
router.post("/chat-group", leadCtrl.getChatGroupCtrl);

export { router };
