const router = require('express').Router();
const db = require('../config/db');

router.post("/", async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(401).json(false)
        }
        res.status(200).json(user)
    }
    catch(err) {
        res.status(500).json(false)
    }
})

module.exports = router;