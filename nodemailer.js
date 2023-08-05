"use strict";
const nodemailer = require("nodemailer");
const { config } = require('./config/config')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {

    user: config.mailUser,
    pass: config.mailPassword
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function senMain() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'angelalberto545@gmail.com', // sender address
    to: "aybplay54@gmail.com", // list of receivers
    subject: "Hello ✔ esto es de la api", // Subject line
    text: "Hello world? que hay ", // plain text body
    html: "<b>Hello world? esto es desde mi otra cuenta de correo</b>", // html body
  });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

senMain().catch(console.error);
