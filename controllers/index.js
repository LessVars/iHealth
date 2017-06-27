const express = require('express')
    , router = express.Router()

router.get('/', function(req, res, next){
    res.render('index.html', {greeting: 'Hello'})
})


exports.router = router