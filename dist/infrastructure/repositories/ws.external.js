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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qr_image_1 = require("qr-image");
const path_1 = __importDefault(require("path"));
const whatsapp_web_js_2 = require("whatsapp-web.js");
/**
 * Extendemos los super poderes de whatsapp-web
 */
class WsTransporter extends whatsapp_web_js_1.Client {
    constructor() {
        super({
            authStrategy: new whatsapp_web_js_1.LocalAuth(),
            puppeteer: { headless: true },
        });
        this.status = false;
        this.qr = "";
        this.generateImage = (base64) => {
            const path = `${process.cwd()}/tmp`;
            let qr_svg = (0, qr_image_1.image)(base64, { type: "svg", margin: 4 });
            qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
            console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡`);
            console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
        };
        console.log("Iniciando....");
        this.initialize();
        this.on("ready", () => {
            this.status = true;
            console.log("LOGIN_SUCCESS");
            this.destroyQr();
        });
        this.on("auth_failure", () => {
            this.status = false;
            console.log("LOGIN_FAIL");
        });
        this.on("qr", (qr) => {
            console.log('hora', new Date().toLocaleTimeString());
            console.log(qr);
            this.qr = qr;
            this.getQr();
            //this.generateImage(qr)
        });
        this.on('message', message => {
            console.log("te llego un mensaje");
            console.log(message.body);
            //console.log(message);
        });
        this.on('change_state', message => {
            console.log('change_state => ', message);
        });
        this.on('disconnected', message => {
            console.log('disconnected => ', message);
            this.status = false;
            this.destroy();
            setTimeout(() => {
                this.initialize();
            }, 3000);
        });
        this.on('loading_screen', message => {
            console.log('loading_screen => ', message);
        });
        this.on('change_state', message => {
            console.log('change_state => ', message);
        });
    }
    /**
     * Enviar mensaje de WS
     * @param lead
     * @returns
     */
    sendMsg(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                const { message, phone } = lead;
                const response = yield this.sendMessage(`${phone}@c.us`, message);
                return { id: response.id.id };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    sendSeveralMsg({ message, phones }) {
        try {
            if (!this.status)
                return Promise.resolve({ error: "WAIT_LOGIN" });
            console.log('enviando varios mensajes');
            phones.forEach((phone) => __awaiter(this, void 0, void 0, function* () {
                yield this.sendMessage(`${phone}@c.us`, message);
            }));
            console.log('varios mensajes enviados');
            return Promise.resolve({ result: 'ok' });
        }
        catch (e) {
            return Promise.resolve({ error: e.message });
        }
    }
    sendSeveralMsgGroup({ message, phones }) {
        try {
            if (!this.status)
                return Promise.resolve({ error: "WAIT_LOGIN" });
            console.log('enviando varios mensajes');
            phones.forEach((phone) => __awaiter(this, void 0, void 0, function* () {
                yield this.sendMessage(`${phone}@g.us`, message);
            }));
            console.log('varios mensajes enviados');
            return Promise.resolve({ result: 'ok' });
        }
        catch (e) {
            return Promise.resolve({ error: e.message });
        }
    }
    getChatss() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                console.log('obteniendo chats');
                let count = 0;
                //const response = await this.getChats();
                const response = yield this.getContacts();
                response.forEach(() => count++);
                return { result: response, count: count };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    getContactss() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                console.log('obteniendo contactos');
                let count = 0;
                const response = yield this.getContacts();
                response.forEach(() => count++);
                return { result: response, count: count };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    getChatt(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                console.log('obteniendo chat por id');
                const response = yield this.getChatById(`${phone}@c.us`);
                const msges = yield response.fetchMessages({ limit: 70 });
                const count = msges.length;
                let msgs = [];
                msges.forEach(msg => {
                    let msgObj = {
                        msg: msg.body,
                        is_me: msg.fromMe,
                        type: msg.type,
                        timestamp: msg.timestamp,
                    };
                    msgs.push(msgObj);
                });
                //console.log(msgs, count);
                return { result: msgs, count: count };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    getChatGroup(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                console.log('obteniendo chat por id');
                const response = yield this.getChatById(`${phone}@g.us`);
                const msges = yield response.fetchMessages({ limit: 70 });
                const count = msges.length;
                let msgs = [];
                msges.forEach(msg => {
                    let msgObj = {
                        msg: msg.body,
                        is_me: msg.fromMe,
                        type: msg.type,
                        timestamp: msg.timestamp,
                        author: msg.author
                    };
                    msgs.push(msgObj);
                });
                //console.log(msgs, count);
                //return { result: msgs, count: count, msges: msges };
                return { result: msgs, count: count };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    getQr() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicPath = `${process.cwd()}/dist/public`;
                if (this.qr === '')
                    return Promise.resolve({ error: "WAIT_QR" });
                let qr_svg = (0, qr_image_1.image)(this.qr, { type: "svg", margin: 4 });
                yield qr_svg.pipe(require("fs").createWriteStream(`${publicPath}/qr.svg`));
                return { result: 'ok', path: `/public/qr.svg`, qr: this.qr };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    sendMedia() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = '51977171315';
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                const media = whatsapp_web_js_2.MessageMedia.fromFilePath(`${process.cwd()}/src/public/hpi.png`);
                const response = yield this.sendMessage(`${phone}@c.us`, media);
                return { id: response.id.id };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    senMediaFromUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = '51977171315';
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                const media = yield whatsapp_web_js_2.MessageMedia.fromUrl('https://www.proturbiomarspa.com/files/_pdf-prueba.pdf');
                const response = yield this.sendMessage(`${phone}@c.us`, media);
                return { id: response.id.id };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    destroyQr() {
        const publicPath = `${process.cwd()}/dist/public`;
        const filePath = path_1.default.join(publicPath, 'qr.svg');
        if (require('fs').existsSync(filePath)) {
            require('fs').unlinkSync(filePath);
            this.qr = '';
            console.log('qr eliminado');
        }
    }
    clientLogout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.status)
                    return Promise.resolve({ error: "WAIT_LOGIN" });
                this.logout();
                this.status = false;
                this.initialize();
                return { result: true };
            }
            catch (e) {
                return Promise.resolve({ error: e.message });
            }
        });
    }
    getStatus() {
        return { status: this.status };
    }
}
exports.default = WsTransporter;
