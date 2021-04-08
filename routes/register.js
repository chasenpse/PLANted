const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
    console.log(req.body)
    const {email, pass} = req.body;
    try {
        const user = await db.users.create({
            email,
            password: await bcrypt.hash(pass, 10)
        })
        res.login.status(200).send(user)
    } catch(err) {
        console.log(err)
        res.status(500).send("something broke")
    }
})

module.exports = router;