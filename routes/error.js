// Error handling middleware

exports.errorHandler = function(err, req, res, next) {
    "use strict";
    console.error(err.message);
    console.error(err.stack);
    res.status(err.code || 500);
	res.send({error: {code: err.code, message: err.message}});
}