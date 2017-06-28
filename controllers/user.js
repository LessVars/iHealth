const express = require('express')
    , router = express.Router()

router.get('/', function(req, res, next){
    res.render('user/index.html')
})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/user', router)
}