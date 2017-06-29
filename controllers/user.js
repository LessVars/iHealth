const express = require('express')
    , router  = express.Router()
    , auth    = require('../middleware/auth.js').auth

router.get('/', function(req, res, next){
    res.render('user/index.html')
})

router.get('/:username', function(req, res, next){
    username = req.params.username
    res.render('user/index.html', { username: username })
})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    // all '/user' and '/user/?' request must authenticated.
    // app.use('/user', router)
    app.use('/user', auth, router)    
}