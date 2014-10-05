var log4js = require('log4js'); 
//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/cheese.log'), 'cheese');

var logger = log4js.getLogger('server');
logger.setLevel('DEBUG');

exports.httpLogger = function(req, res, next) {
   logger.debug("POST:");
   logger.debug("headers:" + JSON.stringify(req.headers)); 
   logger.debug("params:" + JSON.stringify(req.params));
   logger.debug("body:" + JSON.stringify(req.body));
   logger.debug("route:"+ JSON.stringify(req.route));
   logger.debug("IP:" + JSON.stringify(req.ip));
   logger.debug("path:" + req.path);
   logger.debug("");

  next();
}
