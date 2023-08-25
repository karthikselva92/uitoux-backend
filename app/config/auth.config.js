require('dotenv').config();

module.exports = {
    secret: "ZAfdsa",
    tokenTTL: 86400, // milliseconds,
    SMTP_MAIL_HOST : process.env.SMTP_MAIL_HOST ,
    SMTP_MAIL_PORT : process.env.SMTP_MAIL_PORT ,
    SMTP_MAIL_USERNAME : process.env.SMTP_MAIL_USERNAME ,
    SMTP_MAIL_PASSWORD : process.env.SMTP_MAIL_PASSWORD ,
    WEBSITE_NAME : process.env.WEBSITE_NAME ,
    WEBSITE_URL : process.env.WEBSITE_URL ,
    WEBSITE_LOGO : process.env.WEBSITE_LOGO ,
    RESET_URL : process.env.WEBSITE_URL + 'resetpassword/'
  };
  