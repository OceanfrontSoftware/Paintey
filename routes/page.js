const db = require('../modules/db.js')
var fs = require('fs');
const s3 = require('../modules/s3.js')
const express = require('express');
const { ObjectID } = require('mongodb')
const router = express.Router()
const collection = 'paintings';

// home page
router.get('/', function (req, res) {
    db.search(collection, {query: {}, sort: {_id: -1}, limit: 100})
    .then(function(images){
        console.log(`items: ${images.length}`)
        res.render('index', {images: images, title: "Draw & Share Online | Paintey.com"});
    })
    .catch(function(err){
        console.log('home page error: ' + err);
    })
})

router.get('/about', function (req, res) {
    res.render('about', {title: "About | Paintey.com"})
})

router.get('/contact', function (req, res) {
    res.render('contact', {title: "Contact Us | Paintey.com"})
})

router.get('/paint', function (req, res) {
    res.render('paint', {title: "New Painting | Paintey.com"})
})



module.exports = router;