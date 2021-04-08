const router = require('express').Router();
const passport = require('passport');

router.post("/",
    passport.authenticate("local"),
    (req, res) => {
        res.json(true)
    })

module.exports = router;


