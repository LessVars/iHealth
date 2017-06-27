const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const genderTypes = ['Unknown', 'Male', 'Female']
const bloodTypes =  ['Unknown', 'A', 'B', 'AB', 'O']

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

// userSchema.statics.passwordHash = function(password, callback){
//     bcrypt.hash(password, salt_rounds, function(err, hash){
//         callback(err, hash)
//     })
// }

// userSchema.static.passwordCompare = function(password, hash, callback){
//     bcrypt.compare(password, hash, function(err, result){
//         callback(err, result)
//     })
// }

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