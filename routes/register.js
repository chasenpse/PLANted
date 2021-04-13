const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
    console.log(req.body)
    const {email, pass} = req.body;
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
                active: 0
            })
            req.login(newUser, (err)=>err?console.log(err):null)
            res.status(201).json(true)
        } else {
            res.status(409).json('User already exists')
        }
    } catch(err) {
        console.log(err)
        res.status(500).json('An internal server error occurred')
    }
})

module.exports = router;