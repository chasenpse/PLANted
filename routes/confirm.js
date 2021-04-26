const router = require('express').Router();
const db = require('../config/db');
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid").nanoid;
const confirmEmail = require("../emailTemplates/confirmEmail");

router.post("/", (req,res) => {
    db.users.findOne({
        where: {
            emailToken: req.body.token
        },
    }).then(user=>{
        if (new Date(user.tokenExpires) < new Date() && !user.active) {
            const emailToken = nanoid()
            const tokenExpires = new Date()
            tokenExpires.setDate(tokenExpires.getDate() + 1) //24 hours to register!
            user.emailToken = emailToken;
            user.tokenExpires = tokenExpires;
            user.save()
            const mailSuccess = sgMail.send(confirmEmail(user.email, emailToken))

            return res.status(401).json(false) // token expired
        } else if (user.active) {
            return res.status(403).json(false) // user already active
        } else {
            user.active = 1;
            user.tokenExpires = new Date();
            user.save()
            return res.status(200).json(true) // 200 Success!
        }

    }).catch(err=>res.status(500).json(false)); // server error
})

module.exports = router;