var express = require('express')
var router = express.Router()


router.get('/', function (req, res) {
    res.send('get most recent');
  })

router.get('/:id', function (req, res) {
  res.send('get by id');
})


router.post('/:id', function (req, res) {
    res.send('post');
})

module.exports = router