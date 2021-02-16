const router = require('express').Router();
const db = require('../config/db');

router.get("/:id/names", (req,res) => {
    db.crops.findAll({
        attributes: ['name'],
        where: {
            id: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/:id", (req,res) => {
    db.crops.findAll({
        where: {
            id: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

module.exports = router;