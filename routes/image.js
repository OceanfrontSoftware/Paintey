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
    var img = req.body.img;
    
    img = img.replace(/^data:image\/png;base64,/, "");
    var buff = Buffer.from(img, 'base64');
    getId(req)
    .then(function(id){
        console.log('got id: ' + id);
        return UploadImage(id, buff)
    })
    .then(function(id){
        res.send({id: id});
    })
    .catch(function(err){
        console.log('post image failed: ' + err);
    })
})

function getId(req){
    return new Promise(function(fulfill, reject){
        // if id was sent in request then already exists
        var id = req.body.id;
        if(id)
            fulfill(id);
    
        // create new id record in database
        db.insert(collection, {ts: new Date()})
        .then(function(obj){
            id = obj._id;
            fulfill(id);
        })
    });
}


function UploadImage(id, buff){
    return new Promise(function(fulfill, reject){
        console.log('uploading image: ' + id);

        sharp(buff)
        .resize({width: 1000, height: 1000, fit: "inside"})
        .jpeg({quality:90})
        .toBuffer()
        .then(function(buff){
            console.log('uploading image: scaled the large image');
            return s3.uploadFile(buff, id + ".jpg");
        })
        .then(function(ret){
            console.log('uploading image: uploaded large image');
            return sharp(buff)
            .resize({width: 300, height: 300, fit: "inside"})
            .jpeg({quality:90})
            .toBuffer();
        })
        .then(function(buff){
            console.log('uploading image: scaled the thumbnail');
            return s3.uploadFile(buff, id + ".thumb.jpg");
        })
        .then(function(){
            fulfill(id);
        })
    })
}

module.exports = router;