const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid").nanoid;
const confirmEmail = require("../emailTemplates/confirmEmail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.put("/resend", async (req, res) => {

    try {
        const user = await db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(401).json(false)
        }
        else if (user.active) {
            return res.status(403).json(false)
        } else {
            const emailToken = nanoid()
            const tokenExpires = new Date()
            tokenExpires.setDate(tokenExpires.getDate() + 2) //token will be valid for 48 hours
            user.emailToken = emailToken;
            user.tokenExpires = tokenExpires;
            user.save()
            const mailSuccess = sgMail.send(confirmEmail(user.email, emailToken))
            res.status(200).json(true)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(false)
    }
})

router.post("/", async (req, res) => {
    const {email, pass} = req.body;
    const emailToken = nanoid()
    const tokenExpires = new Date()
    tokenExpires.setDate(tokenExpires.getDate() + 1) //24 hours to register!

    try {
        const user = await db.users.findOne({
            where: {
                email
            }
        })
        if (!user) {
            const newUser = await db.users.create({
                email,
                password: await bcrypt.hash(pass, 10),
                active: 0,
                emailToken,
                tokenExpires,
            })

            const mailSuccess = sgMail.send(confirmEmail(newUser.email, emailToken))
            res.status(200).json(true)
        } else {
            res.status(409).json(false)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(false)
    }
})

module.exports = router;