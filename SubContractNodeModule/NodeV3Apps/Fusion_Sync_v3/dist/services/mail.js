"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail_mdlr = void 0;
/// <reference path="../index.d.ts" />
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_juice_1 = __importDefault(require("nodemailer-juice"));
const nodemailer_plugin_inline_base64_1 = __importDefault(require("nodemailer-plugin-inline-base64"));
const mail_1 = require("../config/mail");
const sendMail_mdlr = ({ html, subject, to, from }) => {
    try {
        let transporter = nodemailer_1.default.createTransport(mail_1.SMTP_TRANSPORT);
        transporter.use("compile", nodemailer_juice_1.default());
        transporter.use("compile", nodemailer_plugin_inline_base64_1.default());
        transporter.sendMail({
            from,
            priority: "high",
            to,
            subject,
            html
        });
    }
    catch (err) {
        console.log("error-mail", err.message);
        throw err;
    }
};
exports.sendMail_mdlr = sendMail_mdlr;
//# sourceMappingURL=mail.js.map