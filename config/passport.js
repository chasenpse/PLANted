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
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (err,result) => {
                    if (err) console.log(err)
                    if (result===true) {
                        done(null, user)
                    } else { done(null, false) }
                })
            })
            .catch(err => done(err))
    }

    passport.use(
        new LocalStrategy(customFields, verify)
    );

    passport.serializeUser((user,done)=> {
        done(null, user.id)
    })

    passport.deserializeUser((id,done)=> {
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