"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatus = void 0;
class LeadStatus {
    constructor(leadExternal) {
        this.leadExternal = leadExternal;
    }
    getStatus() {
        return this.leadExternal.getStatus();
    }
}
exports.LeadStatus = LeadStatus;
