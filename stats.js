/* The StatsDAO must be constructed with a connected database object */
function StatsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
    * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof StatsDAO)) {
        console.log('Warning: StatsDAO constructor called without "new" operator');
        return new StatsDAO(db);
    }

    var stats = db.collection("statsData");

    this.insertEntry = function (entry, callback) {
        "use strict";
        console.log("inserting stats entry" + JSON.stringify(entry));

        stats.insert(entry,function(err,inserted){
          "use strict";
          console.log('inserted.. ' + JSON.stringify(inserted));
          if(err)return callback(err,null);
          callback(err, inserted._id);
      });
    }

    this.getStats = function(num, callback) {
        "use strict";

        stats.find().sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " s");

            callback(err, items);
        });
    }

    this.getStatsByX = function(X, num, callback) {
        "use strict";

        stats.find({ x : X }).sort('date', -1).limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log("Found " + items.length + " stats");

            callback(err, items);
        });
    }
}

module.exports.StatsDAO = StatsDAO;