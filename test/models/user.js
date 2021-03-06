const assert = require('assert')
    , connection = require('../../db.js').connection
    , m_user = require('../../models/user.js')
    , User = m_user.User
    , genderTypes = m_user.genderTypes
    , bloodTypes = m_user.bloodTypes

// remove user if exist.
User.remove({username: "dummy"}, function(err){
    if(err) return console.error(err)
})


describe('User Test', function(){

    it('create user', function(done){
        var dummy = new User({
            username: "dummy",
            password: User.passwordHash("1234567"),
            email: "dummy@dummy.com",
            profile: {
                birthday: new Date(1990, 3, 14),
                gender: genderTypes[1],
                height: 170,
                weight: 60,
                bloodType: bloodTypes[4]
            }
        })

        User.create(dummy, function(err, saved_dummy){
            assert.equal(saved_dummy.username, dummy.username)
            done()
        })
    })

    it('activate user', function(done){
        User.findOne({username: "dummy"}, function(err, doc){
             doc.activate()

             assert.equal(doc.activated, true)
             done()
        })
    })

    it('deactivate user', function(done){
        User.findOne({username: "dummy"}, function(err, doc){
            doc.deactivate()

            assert.equal(doc.activated, false)
            done()
        })
    })

    it('static activate user', function(done){
        query = { username: "dummy"}

        User.activate(query, function(err, doc){
            assert.equal(doc.activated, true)
            done()
        })
    })

    it('static deactivate user', function(done){
        query = { username: "dummy"}

        User.deactivate(query, function(err, doc){
            assert.equal(doc.activated, false)
            done()
        })
    })

    it('find user', function(done){
        User.findOne({username: "dummy"}, function(err, doc){
            assert.equal(doc.username, "dummy")
            done()
        })
    })

    it('test user password', function(done){
        User.findOne({username: "dummy"}, function(err, doc){
            assert.equal(doc.password, User.passwordHash("1234567"))
            done()
        })
    })

    it('test password compare', function(done){

        User.findOne({username: "dummy"}, function(err, doc){
            assert.equal( User.passwordCompare("1234567", doc.password), true)
            done()
        })
    })

    it('test if username exist', function(done){
        User.isNameExist("dummy", function(err, result){
            assert.equal(true, true)
            done()
        })
    })

    it('test if username exist', function(done){
        User.isNameExist("dummy2", function(err, result){
            assert.equal(false, false)
            done()
        })
    })

    it('test if email exist', function(done){
        User.isNameExist("dummy@dummy.com", function(err, result){
            assert.equal(true, true)
            done()
        })
    })

    it('test if email exist', function(done){
        User.isNameExist("dummy@dummy2.com", function(err, result){
            assert.equal(false, false)
            done()
        })
    })

    it('delete user', function(done){
        User.findOneAndRemove({username: "dummy"}, function(err, res){
            assert.equal(err, null)
            done()
        })
    })
})