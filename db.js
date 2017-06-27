const mongoose = require('mongoose')

const uri = 'mongodb://localhost:32769/test'
    , options = {
        server: { poolSize: 5 }
    }

mongoose.connect(uri, options).then(
    ()  => { console.log('ready to use') },
    err => { console.error(err) }
)

exports.connection = mongoose.connection