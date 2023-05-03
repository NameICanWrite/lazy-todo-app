import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_TRANSPORT_NAME, // generated ethereal user
    pass: process.env.MAIL_TRANSPORT_PASSWORD, // generated ethereal password
  },
});

export async function sendMail({email, text, html, subject}: {email: string, text: string, subject: string, html: string }) {

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_TRANSPORT_NAME, // sender address
        to: email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });
}