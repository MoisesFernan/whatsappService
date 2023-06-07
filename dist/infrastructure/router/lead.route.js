"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ioc_1 = __importDefault(require("../ioc"));
const router = (0, express_1.Router)();
exports.router = router;
/**
 * http://localhost/lead POST
 */
const leadCtrl = ioc_1.default.get("lead.ctrl");
router.post("/", leadCtrl.sendCtrl);
router.get("/", leadCtrl.getChatsCtrl);
router.get("/chat", leadCtrl.getChatCtrl);
router.get("/qr", leadCtrl.getQrCtrl);
router.post("/send-several-msgs", leadCtrl.sendSeveralMsgCtrl);
router.post("/logout", leadCtrl.logoutCtrl);
