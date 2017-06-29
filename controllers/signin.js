const express = require('express')
    , router  = express.Router()
    , User    = require('../models/user.js').User

    , passport       = require('passport')
    , LocalStrategy  = require('passport-local').Strategy
    , GithubStrategy = require('passport-github').Strategy

/**
 * Local Strategy Handler.
 */
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    // process the login fields
    function(req, username, password, done){
        User.findOne({username: username}, function(err, user){
            if (err) { return done(err) }

            if(!user) {
                return done(null, false, req.flash('danger','Incorrect username.'));   
            }

            if(!user.validPassword(password)){
                console.log('Incorrect password.')            
                return done(null, false, req.flash('danger','Incorrect password.'));
            }
            return done(null, user);
        });
    }
));

/**
 * OAuth: Github
 */
passport.use(new GithubStrategy({
        clientID: "2948e108bbba7185fa43",
        clientSecret: "7ee1526518f04cdfaf96a36e2393493b306457d8",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done){
    // console.log('Serialze user to session ? ' + user);
    done(null, user)
});

/**
 * 
 */
passport.deserializeUser(function(user, done){
    console.log('Okay, you wanna get user infomation from session ? ' + user);
    done(null, user);
});

/**
 * GET /signin handler
 */
router.get('/', function(req, res, next){
    console.log(req.flash('warning'));
    res.render('signin.html', { title: 'Sign In'})
})

/**
 * POST /signin handler
 */
// router.post('/',
//     passport.authenticate('local', { successRedirect: '/',
//                                      failureRedirect: '/signin',
//                                      failureFlash: true })
// )

/**
 * Custom Callback
 * http://passportjs.org/docs/overview
 */
router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) { return next(err); }
        if(!user) { return res.redirect('/signin'); }

        req.logIn(user, function(err){
            if(err) { return next(err); }
            req.flash('success', 'Welcome!')
            return res.redirect('/user/'+ user.username);
        });
    })(req, res, next);
});

/**
 * 
 */
router.get('/github', passport.authenticate('github'));

/**
 * 
 */
router.get('/github/callback', passport.authenticate('github',  { failureRedirect: '/'}),
    function(req, res){
    res.redirect('/');
});

/**
 * we can use glob to regist in one shoot!
 */
module.exports = function(app){
    app.use('/signin', router)
}