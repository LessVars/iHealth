const mongoose = require('mongoose')
    , Schema = mongoose.Schema

var recordSchema = Schema({
    _user: { type:Schema.Types.ObjectId, ref: 'User', required: true },
    symptom: { type: String },
    diagnosticDate : { type:Date, default: Date.now },
    diagnosticResult: { type:String },
    solution: { type:String },
    medicine: [{
        name:  { type:String, required: true },
        dose:  { type:Number, required: true },
        unit:  { type:String }, // bottle, pill, etc.
        price: { type:Number },
        use:   { type:String }, // Injection, eat...
    }],
    createdOn:{ type:Date, default:Date.now }
})

exports.Record = mongoose.model('Record', recordSchema)