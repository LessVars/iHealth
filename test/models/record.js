const assert = require('assert')
    , connection = require('../../db.js').connection
    , User = require('../../models/user.js').User
    , Record = require('../../models/record.js').Record

// create a dummy user for test.
var dummy = new User({
    username: "dummy",
    password: "1234567",
    email: "dummy@dummy.com"
})

User.create(dummy, function(err, saved_dummy){
    console.log('dummy user created')
}).then(

    describe("Test User Records", function(){

        it('create user Record', function(done){

            User.findOne({username: "dummy"}, function(err, user) {

                var record = new Record({
                    _user: user,
                    symptom: "眩晕",
                    diagnosticDate : new Date(2017, 6, 13),
                    diagnosticResult: "偏头痛导致的前庭紊乱" ,
                    solution: "多休息，少熬夜，不吃辛辣，按时用药",
                    medicine: [{
                        name: "疏肝解郁胶囊",
                        dose: 1,
                        unit: "盒",
                        price: 18.5,
                        use:  "一日两次，早晚餐后服用，",
                    },
                    {
                        name: "维生素C",
                        dose: 1,
                        unit: "盒",
                        price: 6.5,
                        use:  "一日三次，早晚餐后服用，",
                    }],
                })

                // push this record to user.

                Record.create(record, function(err, saved_record){
                    console.log(saved_record)
                    assert.equal(saved_record.symptom, "眩晕")

                    if (err){
                        console.error(err)
                    }
                    else{
                        user.records.push(record)
                        user.save()
                    }
                })
                done()
            })
        })

        it('get user record', function(done){
           Record
           .find({_user:dummy._id})
           .exec(function(err, records){
               console.log(records)
               assert.equal(records.length, 1)
               done()
           })
        })
    })
)



// remove user if exist.
User.remove({username: "dummy"}, function(err){
    if(err) return console.error(err)
})