const express = require('express')
    , router = express.Router()
    , User = require('../models/user.js').User

router.get('/', function(req, res, next){
    res.render('signup.html', { title: 'Sign Up'})
})

router.post('/', function(req, res, next){

    console.log(req.body.username)
    console.log(req.body.password)

    req.flash('info', 'Flash message added')

    // User.passwordHash(req.body.password, function(err, hash){
    //     if(err) { console.log('Hash Error') }

    //     if(!hash){
    //         console.log('No Hash Results');
    //     } 
        
    //     var newUser = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password_hash: hash,
    //         lastLogin: Date.now()
    //     });

    //     newUser.save( function(err, user){
    //         if(err) { console.log('Save Error : ' + err) }

    //         console.log('Saved user name:' + user.username);
    //         console.log('_id of saved user: ' + user._id);
    //         console.log('Saved user password_hash: ' + user.password_hash);
    //     });
    // });

    res.redirect('/user');
})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/signup', router)
}