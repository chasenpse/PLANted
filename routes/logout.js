const router = require('express').Router();

router.get('/', (req, res) => {
    req.logout();
    res.status(200).json(true)
})

module.exports = router;