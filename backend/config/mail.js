const nodemailer = require("nodemailer");
const { info, error, log } = console;
const { sendGiftTemplate } = require("../email/gift");
const config = require("../config/index");

exports.sendMail = async function (message) {
  // config
    // const config = {
    //   smtp_secret: process.env.SMTP_SECRET,
    //   smtp_user: process.env.SMTP_USER,
    //   smtp_from: process.env.SMTP_FROM,
    //   application_name: "GIFT SHORES",
    //   smtp_host: process.env.SMTP_HOST,
    // };

    info("sending mail to", message.to + "...");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465, // 587 465
    _auth: {
      user: config.smtp_user,
      pass: config.smtp_secret,
    },
    get auth() {
      return this._auth;
    },
    set auth(value) {
      this._auth = value;
    },
  });
  const packet = {
    from: `"${config.application_name}" <${config.smtp_from}>`,
    to: config.smtp_from,
    bcc: message.to,
    replyTo: `<${config.smtp_from}>`,
    subject: message.subject,
    html: sendGiftTemplate({ ...message.data, purpose: message.subject }),
  };

  try {
    /* send the mail */
    transporter.sendMail(packet, (err, infos) => {
      if (err) {
        error("email sending failed:", err.message);
        info("attempting to send mail again...");
        transporter.sendMail(packet, (err, info) => {
          if (err) {
            console.error(err);
            error("Failed to send mail");
            message.handleError();
          } else {
            message.handleSuccess();
            log("Email sent to:", info.messageId, "after failed trial ");
          }
        });
      } else {
        message.handleSuccess();
        log("Email sent to:", infos.messageId);
      }
    });
  } catch (e) {
    throw new Error(
      "Something is wrong with the mail service, please try again."
    );
  }
};
