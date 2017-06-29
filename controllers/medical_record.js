const express = require('express')
    , router = express.Router()


/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/medical_record', router)
}