var log4js = require("log4js"); 
const myAppenderModule = require("../lib/db.log4js") 
const layoutConfig = { type:"pattern",pattern:"%x{ip}", 
tokens: {rid: e => logContext.rid, ip:e => logContext.ip, ua:e => logContext.ua, id:e => logContext.uid || '-'}};
log4js.configure({
  appenders: { custom: { type: myAppenderModule,layout:layoutConfig } },
  categories: { default: { appenders: ['custom'], level: 'debug' } }
});
module.exports = log4js;
  