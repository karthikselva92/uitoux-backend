var log4js = require("log4js");
const layoutConfig = { type:"pattern",pattern:"%d  [%x{ip}] [%p] [%x{rid}] [%x{id}] [%x{ua}] %c - %m", 
tokens: {rid: e => logContext.rid, ip:e => logContext.ip, ua:e => logContext.ua, id:e => logContext.uid || '-'}};
log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "dateFile", filename: "logs/info.log", compress:true, daysToKeep: 15, layout:layoutConfig},
    client: { type: "dateFile", filename:"logs/client.log", compress: true, daysToKeep: 15, layout:layoutConfig}
  },
  categories: {
    clientLog: { appenders:["client"], level: "debug"},
    default: { appenders: ["out", "app"], level: "debug" },
  },
});
module.exports = log4js;