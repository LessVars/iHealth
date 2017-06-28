const crypto = require('crypto')
    , config = require('../config.js').Config
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema

const genderTypes = ['Unknown', 'Male', 'Female']
const bloodTypes =  ['Unknown', 'A', 'B', 'AB', 'O']

function hash(password){
    return crypto.createHmac(config.HASH_ALGORITHM, config.SECRET_KEY)
                .update(password)
                .digest('hex')
}

var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // the password should be hashed
    password: { type: String, required: true },
    email: { type:String, required: true, unique: true},
    activated: { type: Boolean, default: false },
    createdOn: {type: Date, default: Date.now},
    lastLogin: {type: Date},

    profile: {
        birthday: { type: Date },
        gender: { type:String, enum: genderTypes },
        height: { type: Number },
        weight: { type: Number },
        bloodType: { type: String, enum: bloodTypes }
    },
    records: [{type:Schema.Types.ObjectId, ref: 'Record',  required: true }]
})

userSchema.statics.passwordHash = function(password){
    return hash(password)
}

userSchema.statics.passwordCompare = function(password, hashed_pwd){
    return hash(password) == hashed_pwd ? true : false
}

userSchema.statics.activate = function(query, callback){
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    options = { new: true }
    this.model('User').findOneAndUpdate(query, { activated: true }, options, function(err, doc){
        callback(err, doc)
    })
}

userSchema.statics.deactivate = function(query, callback){
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    options = { new: true }
    this.model("User").findOneAndUpdate(query, { activated: false }, options, function(err, doc){
        callback(err, doc)
    })
}

userSchema.methods.activate = function(callback){
    this.activated = true
    this.save(function(err){
        if(err) return callback(err)
    })
}

userSchema.methods.deactivate = function(callback){
    this.activated = false
    this.save(function(err){
        if(err) return callback(err)
    })
}

exports.genderTypes = genderTypes
exports.bloodTypes = bloodTypes
module.exports.User = mongoose.model('User', userSchema)