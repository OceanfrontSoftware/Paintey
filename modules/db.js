var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Promise = require('promise');
var config = require('config');
var url = config.get('databaseUrl');
var dbName = 'paintey';module.exports = {

// delete a object from the named collection
delete: function(collectionName, id){
    var id = req.params.id;
    var collectionName = req.params.collectionName;
        
    getClient()
    .then(function(db){
        var collection = db.collection(collectionName);
        collection.deleteOne({"_id": new ObjectId(id)}, {}, function(err, item) {
       
            db.close();
            db = null;

            if(err)
                throw err;
        });
    })
    .catch(function(err){
        throw err;
    });
},

// get a record from a collection by id
getById: function(collectionName, id){
    var id = req.params.id;
    var collectionName = req.params.collectionName;
    console.log(`/mongo/${collectionName}/${id}`);
    getClient()
    .then(function(db){
        var collection = db.collection(collectionName);
        collection.findOne({"_id": new ObjectId(id)}, {}, function(err, item) {
   
            db.close();
            db = null;

            if(err)
                throw err;
            return item;
        });
    })
    .catch(function(err){
        throw err;
    });

},

// get a record from a collection by using a filter
search: function(collectionName, params){
   
    getClient()
    .then(function(db){
        var collection = db.collection(collectionName);
        collection.find(params.query, params.projection).sort(params.sort).limit(params.limit).skip(params.skip).toArray(function(err, items) {
            
            db.close();
            db = null;

            if(err)
                throw err;
            return items;
        });
    })
    .catch(function(err){
        throw err;
    });

},
  
// creates a new object in the named collection and returns it
insert: function(collectionName, obj){
    return new Promise(function(fulfill, reject){
        getClient()
        .then(function(client){
            client.connect(function(err){
                if(err)
                    reject(err);

                var db = client.db(dbName);
                var collection = db.collection(collectionName);
                collection.insertOne(obj, function(err, result) {
    
                    client.close();
                    client = null;
    
                    if(err)
                        reject(err);
                    
                    fulfill(obj);
                });
            });         
        })
        .catch(function(err){
            console.log('catch err: ' + err.message)
            reject(err);
        });
    });
},

// sets properties on a set of objects in the named collection
//  query: performs a search for objects
//  props: the values to update
updateQuery: function(collectionName, query, props){

      getClient()
      .then(function(db){
        var collection = db.collection(collectionName);
        collection.update(
          query,
          {$set: props},
          {"multi": true},
          function(err, items) {
            db.close();
            db = null;

            if(err)
                throw err;
            return items;
        }
        );
      })
      .catch(function(err){
        throw err;
      })

},



// sets properties on a single object in the named collection
update: function(collectionName, id, props){
    

      getClient()
      .then(function(db){
        var collection = db.collection(collectionName);
        collection.findAndModify(
          {"_id": new ObjectId(id)},
          {},
          {$set: props},
          {},
          function(err, item) {
            db.close();
            db = null;
            if(err)
                throw err;
          }
        );
      })
      .catch(function(err){
        throw err;
      })

}




}


function getSearchParams(req){
    
    /*
    requests must come in as application/json
    the query parameter is a unique parameter, in that it can be either a json object, or a string
    if it's a string, it will be turned into a function and executed. This is necessary for passing
    function references such as new Date('...') or new ObjectId('...')
    
    //return the id & created date for the 5 jobs before id 5c8a5090bd923833b83a1ea4:
    {
        "query": "return {\"_id\": {\"$lt\": new ObjectId(\"5c8a5090bd923833b83a1ea4\")}}",
        "projection": {"_id": 1, "created": 1},
        "limit": 5
    }
    */
    console.log('getSearchParams starting');

    var params = {
        // query specifies the search conditions
        query: req.body.query  || {},
        // projection specifies what fields to return
        projection: req.body.projection || {},
        // limit the number of results: limit: 5 - return only 5 results
        limit: req.body.limit || 1000,
        // skip the n number of records: skip: 10 - skips the first 10 results
        skip: req.body.skip || 0,
        // sort the results by the key: { age : -1, posts: 1 } - sort by age descending, then by posts ascending
        sort: req.body.sort || {_id: -1}
    }

    if(typeof(params.query) === 'string'){
        console.log(params.query);
        params.query = new Function("ObjectId", params.query)(ObjectId);
        console.log(params.query);
    }
        

    
    return params;
}

// returns a promise containing a mongo db client
function getClient(){
    return new Promise(function(fulfill, reject){
        //MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        var client = new MongoClient(url, {useUnifiedTopology: true});
        fulfill(client);
    });
  }
  

// formats object for web error response
function getErrorResponse(message, err){
    return {
      "message": message,
      "error": err
    };
  }