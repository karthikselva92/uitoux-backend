const ms = require('ms');
const useragent = require('useragent');
const logger = require('../config/log.config.js').getLogger('access');
const requestLogger = (req, res, next) => {
  const startTime = new Date();
  const requestEnd = res.end;
  const requestBody = JSON.stringify(req.body);
  const requestedUrl = req.originalUrl || req.url;
  process.env.host = req.headers.host;
  process.env.protocol = req.secure?'https':'http';

  logContext['ip'] = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
  logContext['ua'] = useragent.parse(req.headers['user-agent']).toString();
  logger.debug('------------------------------------');
  logger.debug(`Body : ${requestBody}`);

  const patchedEnd = (chunk, encoding) => {
    const responseTime = ms(new Date() - startTime);

    res.end = requestEnd;
    res.end(chunk, encoding);

    logger.info(`${req.method} ${requestedUrl} ${res.statusCode} ${responseTime}`)
    logger.debug('------------------------------------');
  };

  res.end = patchedEnd;
  next();
};

module.exports = requestLogger;