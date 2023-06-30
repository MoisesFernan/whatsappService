import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";
import path from "path";
import {MessageMedia} from "whatsapp-web.js";

/**
 * Extendemos los super poderes de whatsapp-web
 */
class WsTransporter extends Client implements LeadExternal {
  private status = false;
  private qr: string = "";

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
    });

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
      console.log(qr)
      this.qr = qr;
      this.getQr();
      //this.generateImage(qr)
    });

    this.on('message', message => {
      console.log("te llego un mensaje")
      console.log(message.body);
      //console.log(message);
    });

    this.on('change_state', message => {
      console.log('change_state => ',message);
    });

    this.on('disconnected', message => {
      console.log('disconnected => ',message);
      this.status = false;
      this.destroy();
      setTimeout(() => {
        this.initialize();
      }, 3000);
    });

    this.on('loading_screen', message => {
      console.log('loading_screen => ',message);
    });
    this.on('change_state', message => {
        console.log('change_state => ',message);
    });
  }

  /**
   * Enviar mensaje de WS
   * @param lead
   * @returns
   */
  async sendMsg(lead: { message: string; phone: string }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone } = lead;
      const response = await this.sendMessage(`${phone}@c.us`, message);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  sendSeveralMsg({message, phones}: { message: string; phones: string[] }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('enviando varios mensajes');
        phones.forEach(async phone => {
            await this.sendMessage(`${phone}@c.us`, message);
        });
      console.log('varios mensajes enviados');
      return Promise.resolve({ result: 'ok' });
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  sendSeveralMsgGroup({message, phones}: { message: string; phones: string[] }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('enviando varios mensajes');
        phones.forEach(async phone => {
          await this.sendMessage(`${phone}@g.us`, message);
        });
        console.log('varios mensajes enviados');
        return Promise.resolve({ result: 'ok' });
    } catch (e: any) {
        return Promise.resolve({ error: e.message });
    }
  }

  async getChatss():Promise<any>{
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('obteniendo chats');
      let count = 0;
      //const response = await this.getChats();
      const response = await this.getContacts();
      response.forEach( () => count++)
      return { result: response , count: count};
    } catch (e: any) {
      return Promise.resolve({ error: e.message })
    }
  }

  async getContactss():Promise<any>{
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('obteniendo contactos');
      let count = 0;
      const response = await this.getContacts();
      response.forEach( () => count++)
      return { result: response , count: count};
    } catch (e: any) {
      return Promise.resolve({ error: e.message })
    }
  }

  async getChatt(phone:number):Promise<any>{
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('obteniendo chat por id');
      const response = await this.getChatById(`${phone}@c.us`);
      const msges = await response.fetchMessages({limit:70});
      const count = msges.length;
      let msgs:any = [];
      msges.forEach(msg => {
        let msgObj = {
          msg: msg.body,
          is_me: msg.fromMe,
          type: msg.type,
          timestamp: msg.timestamp,
        }
        msgs.push(msgObj);
      });
      //console.log(msgs, count);
      return { result: msgs, count: count };
    } catch (e: any) {
      return Promise.resolve({ error: e.message })
    }
  }

  async getChatGroup(phone:number):Promise<any>{
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      console.log('obteniendo chat por id');
      const response = await this.getChatById(`${phone}@g.us`);
      const msges = await response.fetchMessages({limit:70});
      const count = msges.length;
      let msgs:any = [];
      msges.forEach(msg => {
          let msgObj = {
              msg: msg.body,
              is_me: msg.fromMe,
              type: msg.type,
              timestamp: msg.timestamp,
              author: msg.author
          }
          msgs.push(msgObj);
      });
      //console.log(msgs, count);
      //return { result: msgs, count: count, msges: msges };
      return { result: msgs, count: count };
    } catch (e: any) {
        return Promise.resolve({ error: e.message })
    }
  }

  async getQr():Promise<any>{
    try {
      const publicPath = `${process.cwd()}/dist/public`;
      if (this.qr === '' ) return Promise.resolve({ error: "WAIT_QR" });
      let qr_svg = imageQr(this.qr, { type: "svg", margin: 4 });
      await qr_svg.pipe(require("fs").createWriteStream(`${publicPath}/qr.svg`));
      return { result: 'ok', path: `/public/qr.svg`, qr: this.qr };
    } catch (e: any) {
      return Promise.resolve({ error: e.message })
    }
  }

  async sendMedia(): Promise<any> {
    try {
      const phone = '51977171315';
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const media = MessageMedia.fromFilePath(`${process.cwd()}/src/public/hpi.png`);
      const response = await this.sendMessage(`${phone}@c.us`, media);
        return { id: response.id.id };
    } catch (e: any) {
        return Promise.resolve({ error: e.message });
    }
  }

  async senMediaFromUrl(): Promise<any> {
    try {
      const phone = '51977171315';
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const media = await MessageMedia.fromUrl('https://www.proturbiomarspa.com/files/_pdf-prueba.pdf');
      const response = await this.sendMessage(`${ phone }@c.us`, media);
      return { id: response.id.id };
    } catch (e: any) {
        return Promise.resolve({ error: e.message });
    }
  }

  destroyQr() {
      const publicPath = `${process.cwd()}/dist/public`;
      const filePath = path.join(publicPath, 'qr.svg');
      if (require('fs').existsSync(filePath)){
          require('fs').unlinkSync(filePath);
          this.qr = '';
        console.log('qr eliminado');
      }
  }

  async clientLogout(): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      this.logout();
      this.status = false;
      this.initialize();
      return { result: true };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getStatus(): { status: boolean } {
    return { status: this.status };
  }

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  };

}

export default WsTransporter;
