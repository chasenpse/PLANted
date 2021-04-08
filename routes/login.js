const router = require('express').Router();
const passport = require('passport');

router.post("/",
    passport.authenticate("local"),
    (req, res) => {
        res.send("logged in")
    })

module.exports = router;