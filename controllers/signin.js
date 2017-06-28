const express = require('express')
    , router = express.Router()

router.get('/', function(req, res, next){
    res.render('signin.html')
})

router.post('/', function(req, res, next){

})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/signin', router)
}