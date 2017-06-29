const express = require('express')
    , router = express.Router()

router.get('/', function(req, res, next){
    console.log('logging out')
    req.logout()
    res.redirect('/')
})

module.exports = function(app){
    app.use('/signout', router)
}