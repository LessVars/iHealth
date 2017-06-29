const express = require('express')
    , router = express.Router()

router.get('/:username/medical_record', function(req, res, next){
    username = req.params.username

    if (username == "neo")
    {
        res.send('awesome!')
    }
    else 
    {
        res.send('sucks.')
    }
})

/**
 * we can use glob to regist in one shoot!
 */
// module.exports = function(app){
//     // all request must authenticated.
//     app.use('/medical_record', auth, router)
// }

module.exports = function(app){
    // all request must authenticated.
    app.use('/', router)
}