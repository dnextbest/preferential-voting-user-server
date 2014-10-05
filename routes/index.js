var SessionHandler = require('./session')
, ContentHandler = require('./content')
, ErrorHandler = require('./error').errorHandler
, CORSHandler = require('./cors').corsHandler
, HttpLogger = require('./httpLogger').httpLogger;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);

    // Middleware to see if a user is logged in
//    app.use(sessionHandler.isLoggedInMiddleware);

    app.use(ErrorHandler);
    app.use(CORSHandler);
	app.use(HttpLogger);

	app.get('/', contentHandler.showMainPage);
    app.get('/api/votes/voteDefs/:id', contentHandler.newVoteFromVoteDef);
    app.get('/api/votes', contentHandler.getVotes);
    app.post('/api/votes', contentHandler.insertVote);
    app.put('/api/votes', contentHandler.updateVote);
    app.get('/api/votes/:id', contentHandler.getVote);

}