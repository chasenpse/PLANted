const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid").nanoid;
const resetPassEmail = require("../emailTemplates/resetPassEmail");
const genTokenDate = require('../utils/generateTokenDate');


// update user token and send email
router.put("/", async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            res.status(401).json(false)
        } else {
            const emailToken = nanoid()
            user.emailToken = emailToken;
            user.tokenExpires = genTokenDate(new Date());
            user.save()
            const mailSuccess = sgMail.send(resetPassEmail(user.email, emailToken))
            res.status(200).json(true)
        }
    }
    catch(err) {
        res.status(500).json(false)
    }
})

// update user password and invalidate token
router.post("/", async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                emailToken: req.body.token,
            }
        })
        if (!user) {
            res.status(401).json(false)
        } else if (new Date(user.tokenExpires) < new Date()) {
            res.status(403).json(false)
        } else {
            user.password = await bcrypt.hash(req.body.pass, 10);
            user.tokenExpires = new Date();
            user.save()
            res.status(200).json(true)
        }
    }
    catch(err) {
        res.status(500).json(false)
    }
})

module.exports = router;