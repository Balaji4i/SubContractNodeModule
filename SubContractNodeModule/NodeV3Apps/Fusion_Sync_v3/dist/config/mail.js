"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_TRANSPORT = void 0;
exports.SMTP_TRANSPORT = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 25,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
};
//# sourceMappingURL=mail.js.map