const path = require('path')

const express = require('express')
    , nunjucks = require('nunjucks')
    , index = require("./controllers/index.js")


const app = express()

// set template engine.
nunjucks.configure('views',{
    autoescape: true,
    express: app
})

// set Static files directory
app.use(express.static('public'))

// Setting Routing
app.use(index.router)

app.listen(3000, function(){
    console.log('app listen on port: 3000')
})