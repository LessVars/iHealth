const path = require('path')
    , glob = require('glob')

const express       = require('express')
    , logger        = require('morgan')
    , session       = require('express-session')
    , flash         = require('express-flash')
    , cookieParser  = require('cookie-parser')
    , bodyParser    = require('body-parser')
    , favicon       = require('serve-favicon')
    , nunjucks      = require('nunjucks')
    , passport      = require('passport')

    // load db connection
    , connection = require('./db.js').connection
    // load config    
    , config = require('./config.js').Config

const app = express()
app.locals.dbConnection = connection

// set our mark! the favicon
app.use(favicon(path.join(config.PATH.PUBLIC, 'favicon.ico')))
// set template engine.
nunjucks.configure('views',{
    autoescape: true,
    express: app
})

app.use(logger('dev'))

// set Static files directory
app.use(express.static('public'))

// app.use(cookieParser('keyboard cat'))

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// https://github.com/expressjs/session
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(flash())

// http://passportjs.org/docs/username-password
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    console.log('Code @ express.js :) ');
    console.log(res.locals)
    console.log(req.user);
    res.locals.user = req.user;
    next();
});

// Register Routing
const controllers = glob.sync(path.join(config.PATH.CONTROLLERS, '*.js'))
controllers.forEach(function(controller) {
    require(controller)(app)
}, this);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404)

    res.render('404.html', {
        title: '404',
        admin: config.APP_ADMIN
    })
})

app.use(function(err, req, res, next){
    res.status(err.status || 500)
    res.render('500.html', {
        message: err.message,
        error: {},
        title: '500',
        admin: config.APP_ADMIN
    })
})

// Start listening.
app.listen(3000, function(){
    console.log('app listen on port: 3000')
})