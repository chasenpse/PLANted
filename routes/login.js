const router = require('express').Router();
const passport = require('passport');

router.post("/",
    (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return res.status(500).json(false); }
        if (!user) { return res.status(401).json(false); }
        if (user.active === 0) {
            return res.status(403).json(false);
        }
        return req.logIn(user, (err) => {
            if (err) { return res.status(500).json(false); }
            res.status(200).json(true);
        });
    })(req, res, next);
});

module.exports = router;
