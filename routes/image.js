const db = require('../modules/db.js')
var fs = require('fs');
const s3 = require('../modules/s3.js')
const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router()
const collection = 'paintings';


router.get('/', function (req, res) {
    db.search(collection, {limit: 100})
    .then(function(items){
        console.log(`items: ${items.length}`)
    })
    res.send('get most recent');
})

router.get('/:id', function (req, res) {
    db.getById(collection, req.params.id)
    .then(function(item){
        console.log(`item: ${JSON.stringify(item, null, 2)}`);
    })
    res.send('get by id');
})


router.post('/', function (req, res) {
    // upload to spaces
    
    
    var id = "";

    // insert db record with url
    db.insert(collection, {ts: new Date()})
    .then(function(obj){
        id = obj._id;
        var img = req.body.img;
        img =img.replace(/^data:image\/png;base64,/, "");
        let buff = Buffer.from(img, 'base64');
        return s3.uploadFile(buff, id + ".png");
    })
    .then(function(ret){
        res.send({id: id});
    })
    .catch(function(err){
        console.log('post image failed: ' + err);
    })
})

module.exports = router;