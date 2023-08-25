var nodemailer = require("nodemailer");
var _ = require('lodash');
const { email_template: EmailTemplate, Sequelize } = require("../models");
const getConfig = require("../config/auth.config.js");
let defaultReplacemets = []
    console.log("smtp_host",getConfig.SMTP_MAIL_HOST);
let mailTransporter = nodemailer.createTransport({
    host: getConfig.SMTP_MAIL_HOST,
    port: getConfig.SMTP_MAIL_PORT,
    secure: getConfig.SMTP_MAIL_PORT == 465 ? true : false,
    auth: {
        user: getConfig.SMTP_MAIL_USERNAME, // generated ethereal user
        pass: getConfig.SMTP_MAIL_PASSWORD, // generated ethereal password
    }
});

const assignReplacers = (html, replacers) => {
    let updatedHtml = html
    for (let replacer of replacers) {
        updatedHtml = _.replace(updatedHtml, new RegExp(replacer.replacer, 'g'), replacer.replacement)
    }
    console.log(updatedHtml);
    return updatedHtml
}

const getTemplate = async (key) => {
    const getTemplate = await EmailTemplate.findOne({
        where: { name: key },
      });
    if (!getTemplate)
        throw new Error('email_template_not_found')
    return getTemplate
}

const sendMail = async (payload) => {
    try {
        let {
            to,
            data,
            template,
            from,
            subject
        } = payload
        let replacers = [];
        let replacer =Object.keys(data);
        let replacement =Object.values(data);
        for(let i =0; i < replacer.length; i++){
            replacers.push({replacer:replacer[i], replacement: replacement[i]})
        }
        //let replacers =[replacer, replacement]
        const template_data = await getTemplate(template)
        const updatedHtml = assignReplacers(template_data.html, replacers)
        
        console.log(updatedHtml);
        console.log(replacers);
       
        let mailSend = await mailTransporter.sendMail({
            from: from || getConfig.SMTP_MAIL_USERNAME, // sender address
            to, // list of receivers
            subject: subject || template.subject, // Subject line
            html: updatedHtml, // html body
        });

        return mailSend
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports ={
    sendMail
}

