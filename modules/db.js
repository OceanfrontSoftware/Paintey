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
        
    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
        client.connect(function(err){
            if(err)
                reject(err);

            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.deleteOne({"_id": new ObjectId(id)}, {}, function(err, result) {

                client.close();
                client = null;

                if(err)
                    reject(err);
                
                // is delete - no need to 
                //fulfill(result);
            })
            
        });         
    });
},

// get a record from a collection by id
getById: function(collectionName, id){
    var id = req.params.id;
    var collectionName = req.params.collectionName;
    
    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
        client.connect(function(err){
            if(err)
                reject(err);

            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.findOne({"_id": new ObjectId(id)}, {},  function(err, result) {

                client.close();
                client = null;

                if(err)
                    reject(err);
                
                fulfill(result);
            })
            
        });         
    });
},

// get a record from a collection by using a filter
search: function(collectionName, params){
    
    // set defaults
    if(!params)
        params = {};
    if(!params.query)
        params.query = {};
    if(!params.projection)
        params.projection = {};
    if(!params.sort)
        params.sort = {_id: -1};
    if(!params.limit)
        params.limit = 100;
    if(!params.skip)
        params.skip = 0; 

    //console.log(`collectionName: ${collectionName}, params: ${JSON.stringify(params, null, 2)}`)

    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
        client.connect(function(err){
            if(err)
                reject(err);

            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.find(params.query, params.projection).sort(params.sort).limit(params.limit).skip(params.skip).toArray(function(err, items) {
                
                client.close();
                client = null;

                if(err)
                    reject(err);

                fulfill(items);
            });
        });
    });
    

},
  
// creates a new object in the named collection and returns it
insert: function(collectionName, obj){
    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
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
    });
},

// sets properties on a set of objects in the named collection
//  query: performs a search for objects
//  props: the values to update
updateQuery: function(collectionName, query, props){
    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
        client.connect(function(err){
            if(err)
                reject(err);

            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.updateMany(
                query,
                {$set: props},
                {"multi": true}, 
                function(err, result) {

                    client.close();
                    client = null;

                    if(err)
                        reject(err);
                    
                    // is an update - no need to 
                    //fulfill(result);
            })
            
        });         
    });

},



// sets properties on a single object in the named collection
update: function(collectionName, id, props){
    
    return new Promise(function(fulfill, reject){
        var client = new MongoClient(url, {useUnifiedTopology: true});
        client.connect(function(err){
            if(err)
                reject(err);

            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.findAndModify(
                {"_id": new ObjectId(id)},
                {},
                {$set: props},
                {},
                function(err, result) {

                    client.close();
                    client = null;

                    if(err)
                        reject(err);

                    // is an update - no need to 
                    //fulfill(result);
            })
            
        });         
    });
}




}



// returns a promise containing a mongo db client
function getClient(){
    return new Promise(function(fulfill, reject){
        
        fulfill(client);
    });
}
  

