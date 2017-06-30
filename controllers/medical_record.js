const express = require('express')
    , router = express.Router()

/**
 * List all medical records
 */
router.get('/', function(req, res, next){
    username = res.locals.username

    if (username == "neo")
    {
        res.send('awesome!')
    }
    else 
    {
        res.send('sucks.')
    }
})

router.get('/new', function(req, res, next){
    res.send('you try to create a new record?')
})

router.post('/new', function(req, res, next){
    res.send('Process your request')
})

router.get('/:id', function(req, res, next){
    res.send('medical record detial' + req.params.id)
})

router.get('/:id/edit', function(req, res, next){
    res.send('edit a medical record' + req.params.id)
})



/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    // all request must authenticated.
    app.use('/:username/medical_record', function(req, res, next){
        res.locals.username = req.params.username
        next()
    },  router)
}
