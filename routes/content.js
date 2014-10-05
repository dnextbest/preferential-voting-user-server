var VoteDAO = require('../vote').VoteDAO;
/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
	"use strict";

	var votes= new VoteDAO(db);

	this.showMainPage = function(req,res,next){
		res.type('application/json');
		return res.send({msg: "Hello in da app!"});
	}
 this.newVoteFromVoteDef = function(req, res, next) {
    "use strict";
    res.type('application/json'); 
    var id = req.params.id
    console.log("Vote Def ID : " + id);
    votes.newVoteFromVoteDef(id, function(err, doc) {
        "use strict";

        if (err) return next(err);
        console.log(JSON.stringify(doc));
        if(doc){
          return res.send(doc);
        }else {
          return res.send({})
        }
        
    });
      
  }

	this.insertVote = function(req, res, next) {
		"use strict";
		res.type('application/json'); 

    var vote = req.body
    vote.dateCreated = Date.now();

    votes.insertVote(req.body, function(err, doc) {
      	"use strict";

      	if (err) return next(err);
        console.log(JSON.stringify(doc));
      	return res.send(doc);
    });
      
  }

  this.updateVote = function(req, res, next) {
    "use strict";
    res.type('application/json'); 

    var vote = req.body
    vote.lastUpdated = Date.now();

    votes.updateVote(req.body, function(err, doc) {
        "use strict";

        if (err) return next(err);
        
        console.log(JSON.stringify(doc));
        return res.send(doc);
    });
      
  }

  this.getVote = function(req, res, next) {
    "use strict";
    res.type('application/json'); 
    var id = req.params.id
    console.log("ID : " + id);
    votes.getVote(id, function(err, doc) {
        "use strict";

        if (err) return next(err);
        console.log(JSON.stringify(doc));
        if(doc){
          return res.send(doc);
        }else {
          return res.send({})
        }
        
    });
      
  }
  this.getVotes = function(req, res, next) {
    "use strict";
    res.type('application/json'); 
    var pageSize;
    if(req.query.pageSize){
      pageSize = req.query.pageSize;
    } else{
      pageSize = 10;
    }
    var page;
    if(req.query.page){
      page = req.query.page - 1;
    } else{
      page = 0;
    }

    var skip = pageSize * page;
    console.log(pageSize);

    votes.getVotes(skip, pageSize, function(err, docs) {
        "use strict";

        if (err) return next(err);

        return res.send(docs);
    });
      
  }
}
module.exports = ContentHandler;
