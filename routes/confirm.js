const router = require('express').Router();
const db = require('../config/db');
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid").nanoid;
const confirmEmail = require("../emailTemplates/confirmEmail");
const genTokenDate = require("../utils/generateTokenDate");

router.post("/", (req,res) => {
    db.users.findOne({
        where: {
            emailToken: req.body.token
        },
    }).then(user=>{
        if (new Date(user.tokenExpires) < new Date() && !user.active) {
            const emailToken = nanoid()
            user.emailToken = emailToken;
            user.tokenExpires = genTokenDate(new Date());
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