const express = require('express')
    , router = express.Router()
    , User = require('../models/user.js').User

router.get('/', function(req, res, next){
    res.render('signup.html', { title: 'Sign Up'})
})

router.post('/', function(req, res, next){

    // console.log(req.body.username)
    // console.log(req.body.email)
    // console.log(req.body.password)

    User.isNameExist(req.body.username, function(err, result){
        if (err) { next(err) }
        
        console.log(result)

        if (result){
            console.log('Username already exist.')
            req.flash('warning', 'Username already exist.')
            res.redirect('/signup')
            return
        }

        User.isEmailExist(req.body.email, function(err, result){
            if (err) { next(err) }

            if (result){
                console.log('Email already exist.')
                req.flash('info', 'Email already exist.')
                res.redirect('/signup')
                return
            }

            console.log('everything is okay!')

            // everything is ok.
            var user = new User({
                username: req.body.username,
                password: User.passwordHash(req.body.password),
                email: req.body.email
            })

            // save to DB
            User.create(user, function(err, result){
                if(err) { next(err) } 
                
                if(result != null){
                    console.log(result)
                    req.flash('success', 'Register Successfully')
                    res.redirect('/signin');
                }
                else{
                    var error = new Error('Create user failed')
                    next(error)
                }
            })
        })
    })
})

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/signup', router)
}