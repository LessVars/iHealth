const path = require('path')
    , glob = require('glob')

const express    = require('express')
    , session    = require('express-session')
    , flash      = require('express-flash')
    , bodyParser = require('body-parser')
    , favicon    = require('serve-favicon')
    , nunjucks   = require('nunjucks')

    // load config    
    , config = require('./config.js').Config

const app = express()
var sessionStore = new session.MemoryStore

// set our mark! the favicon
app.use(favicon(path.join(config.PATH.PUBLIC, 'favicon.ico')))

app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash())

// set template engine.
nunjucks.configure('views',{
    autoescape: true,
    express: app
})

// set Static files directory
app.use(express.static('public'))



// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Register Routing
const controllers = glob.sync(path.join(config.PATH.CONTROLLERS, '*.js'))
controllers.forEach(function(controller) {
    require(controller)(app)
}, this);

// Error handler
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