const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail");
const nanoid = require("nanoid").nanoid;
const confirmEmail = require("../emailTemplates/confirmEmail");
const genTokenDate = require('../utils/generateTokenDate');

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
            user.emailToken = emailToken;
            user.tokenExpires = genTokenDate(new Date());
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
    const tokenExpires = genTokenDate(new Date());

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

            const mail = await sgMail.send(confirmEmail(newUser.email, emailToken))
            console.log(mail)
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