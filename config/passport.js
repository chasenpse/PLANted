const db = require('../config/db');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    const customFields = {
        usernameField: 'email',
        passwordField: 'pass',
    }

    const verify = (email, password, done) => {
        db.users.findOne({
            where: {
                email
            },
            raw: true
        })
            .then(user => {
                console.log(`trying to auth user - ${user.id}:${user.email}`)
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (err,result) => {
                    console.log("comparing hash...")
                    if (err) console.log(err)
                    if (result===true) {
                        console.log("authed!")
                        done(null, user)
                    }
                    done(null, false)
                })
            })
            .catch(err => done(err))
    }

    passport.use(
        new LocalStrategy(customFields, verify)
    );

    passport.serializeUser((user,done)=>{
        console.log("serializing ", user.id)
        done(null, user.id)
    })

    passport.deserializeUser((id,done)=> {
        console.log("deserialzing ", id)
        db.users.findOne({
            where: {
                id: id
            },
            raw: true
        })
            .then(user=>done(null, user))
            .catch(err=>done(err))
    })
}