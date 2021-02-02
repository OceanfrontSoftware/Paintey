const db = require('../modules/db.js')
var fs = require('fs');
const s3 = require('../modules/s3.js')
const express = require('express');
const sharp = require('sharp');
const { ObjectID } = require('mongodb');
const router = express.Router()
const collection = 'paintings';


router.get('/', function (req, res) {
    db.search(collection, {limit: 100})
    .then(function(items){
        res.send(items);
    })
    
})

router.get('/:id', function (req, res) {
    var id = req.params.id;
    db.getById(collection, id)
    .then(function(item){
        res.send(item);
    })
})


router.post('/', function (req, res) {
    // upload to spaces
    var id = "";
    var img = req.body.img;
    img =img.replace(/^data:image\/png;base64,/, "");

    // insert db record with url
    db.insert(collection, {ts: new Date()})
    .then(function(obj){
        id = obj._id;
        let buff = Buffer.from(img, 'base64');
        return sharp(buff)
        .resize(1000)
        .jpeg({quality:90})
        .toBuffer();
    })
    .then(function(buff){
        return s3.uploadFile(buff, id + ".jpg");
    })
    .then(function(ret){
        let buff = Buffer.from(img, 'base64');
        return sharp(buff)
        .resize(300)
        .jpeg({quality:90})
        .toBuffer();
    })
    .then(function(buff){
        return s3.uploadFile(buff, id + ".thumb.jpg");
    })
    .then(function(ret){
        res.send({id: id});
    })
    .catch(function(err){
        console.log('post image failed: ' + err);
    })
})

module.exports = router;