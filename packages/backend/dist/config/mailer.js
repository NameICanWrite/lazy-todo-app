"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_TRANSPORT_NAME,
        pass: process.env.MAIL_TRANSPORT_PASSWORD,
    },
});
async function sendMail({ email, text, html, subject }) {
    let info = await transporter.sendMail({
        from: process.env.MAIL_TRANSPORT_NAME,
        to: email,
        subject,
        text,
        html,
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map