"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadGetContacts = void 0;
class LeadGetContacts {
    constructor(leadExternal) {
        this.leadExternal = leadExternal;
    }
    getContacts() {
        return this.leadExternal.getContactss();
    }
}
exports.LeadGetContacts = LeadGetContacts;
