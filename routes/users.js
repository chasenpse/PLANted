const router = require('express').Router();
const db = require('../config/db');

router.get('/', (req,res) => {
    res.send({get: 'hello'});
});

router.get("/:id", (req,res) => {
    db.users.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(users => users ? res.send(users) : res.status(400).send(null))
        .catch(err => res.status(500).send(null));
});

router.post("/register", (req,res) => {
    res.send({
        register: "yes",
    });
});

module.exports = router;