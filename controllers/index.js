const express = require('express')
    , router = express.Router()
    , auth    = require('../middleware/auth.js').auth

router.get('/', function(req, res, next){
    res.render('index.html', {greeting: 'Hello'})
})

/**
 * if we have mutliple page, we should keep some reserve words for
 * navigation, e.g. home, about, service, product, etc.
 */
router.get('/:username', auth, function(req, res, next){
    username = req.params.username
    res.render('profile.html', { username: username })
})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/', router)
}
