/* The StatsDAO must be constructed with a connected database object */
var ObjectID = require('mongodb').BSONPure.ObjectID;

function VoteDAO(db) {
	"use strict";

    /* If this constructor is called without the "new" operator, "this" points
    * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof VoteDAO)) {
    	console.log('Warning: VoteDefDAO constructor called without "new" operator');
    	return new VoteDAO(db);
    }

    var voteDef = db.collection("voteDef");
    var vote = db.collection("vote");

    this.validate = function(vote){
        console.log('validate : ' , vote);
        if(!voteDef.description || !voteDef.email || !voteDef.fields){
            return false;
        }
        return true;
    }

    this.insertVote = function (entry, callback) {
    	"use strict";
    	console.log("inserting Vote entry" + JSON.stringify(entry));

       //if(this.validate(entry)){
            vote.voted = true;
        	vote.insert(entry,function(err,inserted){
        		"use strict";
        		console.log('inserted.. ' + JSON.stringify(inserted));
        		if(err)return callback(err,null);

        		callback(err, inserted[0]);
        	});
        // }else{
        //     var error = new Error('Bad request'); 
        //     error.code = '400';
        //     throw error;
        // }
    }

    this.getVotes = function (skip, limit, callback) {
    	"use strict";

    	vote.find(null, null, { sort:{dateCreated:1}, skip: skip, limit: limit }).toArray(function(err, items) {
    		"use strict";

    		if (err) return callback(err, null);

    		console.log("Found " + items.length + " items");

    		callback(err, items);
    	});
    };

    this.getVote = function(id, callback) {
    	"use strict";
    	var obj_id = ObjectID.createFromHexString(id);
    	vote.findOne({_id: obj_id},function(err, item) {
    		"use strict";

    		if (err) return callback(err, null);

    		console.log("Found: " + JSON.stringify(item));

    		callback(err, item);
    	});
    };

    this.newVoteFromVoteDef = function(voteDefId, callback) {
        "use strict";
        var obj_id = ObjectID.createFromHexString(voteDefId);
        voteDef.findOne({_id: obj_id},function(err, item) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found: " + JSON.stringify(item));
            if(!item){
                throw new Error("Could not find voteDef with id " + obj_id );
            }
            var liked = item.fields.map(function(e){return {title: e.value};})
            var vote = {
                voteDefId : item._id,
                voted :  false,
                email : 'your email',
                liked: liked,
                notliked: []
            };
            callback(err, vote);
        });
    };


    this.updateVote= function (entry, callback) {
        "use strict";
        console.log("updating Vote entry" + JSON.stringify(entry));

       if(entry._id){ //&& this.validate(entry)){
            var toUpdate = JSON.parse(JSON.stringify(entry));;
            var obj_id = ObjectID.createFromHexString(entry._id);
            delete entry._id; // remove _id from the object to make save work (_id is readonly)
            vote.update(
                {_id: obj_id},
                entry,
                function(err, cnt, status){
                    "use strict";
                    console.log('updated.. ' + JSON.stringify(toUpdate));
                    if(err)return callback(err,null);
                    if(cnt=0) throw new Error("Could not update object");

                    callback(err, toUpdate);
                }
            );
        }else{
            var error = new Error('Bad request'); 
            error.code = '400';
            throw error;
        }
    }




}

module.exports.VoteDAO = VoteDAO;